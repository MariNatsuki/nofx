package pool

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"nofx/market"
	"strconv"
	"strings"
	"sync"
	"time"
)

var (
	binanceCache     []CoinInfo
	binanceCacheTime time.Time
	binanceCacheMutex sync.RWMutex
	cacheDuration    = 10 * time.Minute // Cache for 10 minutes
)

// FetchBinanceFuturesCoins fetches all USDT perpetual futures pairs from Binance
// and filters them by OI threshold (15M for major coins, 10M for altcoins)
func FetchBinanceFuturesCoins() ([]CoinInfo, error) {
	// Check cache first
	binanceCacheMutex.RLock()
	if len(binanceCache) > 0 && time.Since(binanceCacheTime) < cacheDuration {
		binanceCacheMutex.RUnlock()
		log.Printf("✓ 使用Binance币种池缓存（共%d个币种，缓存时间: %v）", len(binanceCache), time.Since(binanceCacheTime))
		return binanceCache, nil
	}
	binanceCacheMutex.RUnlock()

	log.Printf("🔄 正在从Binance获取USDT永续合约币种池...")

	apiClient := market.NewAPIClient()

	// 1. Get all trading pairs
	exchangeInfo, err := apiClient.GetExchangeInfo()
	if err != nil {
		return nil, fmt.Errorf("获取Binance交易对信息失败: %w", err)
	}

	// 2. Filter for USDT perpetual futures
	var symbols []string
	for _, symbol := range exchangeInfo.Symbols {
		if symbol.Status == "TRADING" &&
			symbol.ContractType == "PERPETUAL" &&
			strings.ToUpper(symbol.Symbol[len(symbol.Symbol)-4:]) == "USDT" {
			symbols = append(symbols, symbol.Symbol)
		}
	}

	log.Printf("✓ 找到 %d 个USDT永续合约交易对，开始筛选...", len(symbols))

	// 3. Fetch data for each symbol and filter by OI threshold
	var filteredCoins []CoinInfo
	var wg sync.WaitGroup
	var mu sync.Mutex
	semaphore := make(chan struct{}, 20) // Limit concurrent requests to 20

	for _, symbol := range symbols {
		wg.Add(1)
		go func(sym string) {
			defer wg.Done()
			semaphore <- struct{}{} // Acquire
			defer func() { <-semaphore }() // Release

			coin, err := fetchAndFilterCoin(apiClient, sym)
			if err != nil {
				// Log but don't fail - individual coin failures shouldn't stop the process
				log.Printf("⚠️  获取 %s 数据失败: %v", sym, err)
				return
			}

			if coin != nil {
				mu.Lock()
				filteredCoins = append(filteredCoins, *coin)
				mu.Unlock()
			}
		}(symbol)
	}

	wg.Wait()

	log.Printf("✓ Binance币种池筛选完成: %d 个币种通过OI阈值筛选", len(filteredCoins))

	// 4. Update cache
	binanceCacheMutex.Lock()
	binanceCache = filteredCoins
	binanceCacheTime = time.Now()
	binanceCacheMutex.Unlock()

	return filteredCoins, nil
}

// fetchAndFilterCoin fetches price and OI data for a symbol and filters by OI threshold
func fetchAndFilterCoin(apiClient *market.APIClient, symbol string) (*CoinInfo, error) {
	// Fetch current price (needed for OI value calculation)
	price, err := apiClient.GetCurrentPrice(symbol)
	if err != nil {
		return nil, fmt.Errorf("获取价格失败: %w", err)
	}

	// Fetch open interest
	oi, err := getOpenInterest(symbol)
	if err != nil {
		return nil, fmt.Errorf("获取OI失败: %w", err)
	}

	// Calculate OI value in millions (OI * price)
	oiValue := oi * price
	oiValueInMillions := oiValue / 1_000_000

	// Determine if it's a major coin (BTC or ETH)
	isMajor := symbol == "BTCUSDT" || symbol == "ETHUSDT"
	minThreshold := 10.0 // Altcoins: 10M
	if isMajor {
		minThreshold = 15.0 // Major coins: 15M
	}

	// Filter by OI threshold
	if oiValueInMillions < minThreshold {
		return nil, nil // Filtered out, but not an error
	}

	// Convert to CoinInfo
	coin := &CoinInfo{
		Pair:        symbol,
		Score:       0, // Will be calculated by recommendation engine
		IsAvailable: true,
	}

	return coin, nil
}

// getOpenInterest fetches open interest for a symbol
func getOpenInterest(symbol string) (float64, error) {
	url := fmt.Sprintf("https://fapi.binance.com/fapi/v1/openInterest?symbol=%s", symbol)

	resp, err := http.Get(url)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	var result struct {
		OpenInterest string `json:"openInterest"`
		Symbol       string `json:"symbol"`
		Time         int64  `json:"time"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return 0, err
	}

	oi, err := strconv.ParseFloat(result.OpenInterest, 64)
	if err != nil {
		return 0, err
	}

	return oi, nil
}

