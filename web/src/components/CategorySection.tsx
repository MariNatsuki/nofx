import RecommendationCard from './RecommendationCard'

interface Recommendation {
  symbol: string
  score: number
  confidence: number
  direction: string
  strategies: string[]
  reasoning: string
  current_price: number
  suggested_leverage: number
}

interface CategorySectionProps {
  title: string
  coins: Recommendation[]
  icon: string
}

export default function CategorySection({
  title,
  coins,
  icon,
}: CategorySectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>{icon}</span>
        <span>{title}</span>
        <span className="text-sm font-normal text-gray-600">
          ({coins.length} recommendations)
        </span>
      </h2>

      {coins.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No recommendations available for this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coins.map((coin) => (
            <RecommendationCard key={coin.symbol} recommendation={coin} />
          ))}
        </div>
      )}
    </div>
  )
}
