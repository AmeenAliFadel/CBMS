const rewards = {
  currentPoints: 850,
  maxPoints: 1000,
  helperText: "150 points until your next complimentary upgrade!",
}

export default function LuxeRewardsCard() {
  const progress = (rewards.currentPoints / rewards.maxPoints) * 100

  return (
    <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4 w-full">

      {/* LUXEREWARDS Label */}
      <p className="text-xs font-bold text-primary tracking-widest uppercase">
        LuxeRewards
      </p>

      {/* Points Row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Points Progress</span>
          <span className="text-sm font-bold text-primary">
            {rewards.currentPoints} / {rewards.maxPoints}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-text-secondary leading-relaxed">
        {rewards.helperText}
      </p>

    </div>
  )
}