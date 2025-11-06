interface StrategySelectorProps {
  selectedStrategies: string[]
  onChange: (strategies: string[]) => void
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
  selectedStrategies,
  onChange,
}: StrategySelectorProps) {
  const toggleStrategy = (strategyId: string) => {
    if (selectedStrategies.includes(strategyId)) {
      onChange(selectedStrategies.filter((s) => s !== strategyId))
    } else {
      onChange([...selectedStrategies, strategyId])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {strategies.map((strategy) => (
        <label
          key={strategy.id}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-lg hover:bg-gray-50 transition"
        >
          <input
            type="checkbox"
            checked={selectedStrategies.includes(strategy.id)}
            onChange={() => toggleStrategy(strategy.id)}
            className="w-4 h-4"
          />
          <span className="text-sm">{strategy.name}</span>
        </label>
      ))}
    </div>
  )
}
