interface StrategySelectorProps {
  selectedStrategy: string
  onChange: (strategy: string) => void
}

const strategies = [
  { id: 'risk_first', name: 'Risk First' },
  { id: 'adaptive', name: 'Adaptive' },
  { id: 'adaptive_relaxed', name: 'Adaptive Relaxed' },
  { id: 'nof1', name: 'Sharpe Ratio Focus' },
  { id: 'Hansen', name: 'Hansen Conservative' },
  { id: 'taro_long_prompts', name: 'Taro Long' },
  { id: 'default', name: 'Default' },
]

export default function StrategySelector({
  selectedStrategy,
  onChange,
}: StrategySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {strategies.map((strategy) => {
        const isSelected = selectedStrategy === strategy.id
        return (
          <label
            key={strategy.id}
            className="flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-lg transition-all hover:scale-105"
            style={{
              background: isSelected ? 'rgba(240, 185, 11, 0.15)' : '#1E2329',
              border: isSelected
                ? '1px solid rgba(240, 185, 11, 0.4)'
                : '1px solid #2B3139',
              color: isSelected ? '#F0B90B' : '#B7BDC6',
            }}
          >
            <input
              type="radio"
              name="strategy"
              value={strategy.id}
              checked={isSelected}
              onChange={() => onChange(strategy.id)}
              className="w-4 h-4"
              style={{ accentColor: '#F0B90B' }}
            />
            <span className="text-sm font-medium">{strategy.name}</span>
          </label>
        )
      })}
    </div>
  )
}
