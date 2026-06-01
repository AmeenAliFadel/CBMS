import type { BookingTab } from "../../../utils/bookingDisplay";

const tabs: Array<{ key: BookingTab; label: string }> = [
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

interface TabBarProps {
  activeTab: BookingTab;
  setActiveTab: (tab: BookingTab) => void;
  counts?: Partial<Record<BookingTab, number>>;
}

export default function TabBar({ activeTab, setActiveTab, counts }: TabBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const count = counts?.[tab.key];

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative -mb-px flex items-center gap-2 border-b-2 px-4 pb-3 text-sm font-semibold transition-colors cursor-pointer ${isActive
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
          >
            <span>{tab.label}</span>
            {typeof count === "number" ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-surface text-text-secondary"
                  }`}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}