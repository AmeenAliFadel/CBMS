
const tabs = ["Upcoming Trips", "Completed", "Cancelled"]

interface TabBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  return (
    <div className="flex items-center border-b border-border w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold pb-3 px-4 transition-all cursor-pointer
              ${isActive
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-text-secondary hover:text-text-primary"
              }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}