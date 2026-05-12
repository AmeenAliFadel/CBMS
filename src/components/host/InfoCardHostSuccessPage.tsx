import type { CardItemHostPage } from "../../types/host/hostPagesTypes";



export default function InfoCard({ item }: { item: CardItemHostPage }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl  border-border border-2 bg-white p-8 shadow-[0_10px_30px_rgba(99,102,241,0.08)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(99,102,241,0.12)]">
      <div
        className={`mb-4 inline-flex h-9 w-9  sm:h-12 sm:w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} shadow-sm`}
      >
        {item.icon}
      </div>
      <h3 className="text-[15px]  text-text-primary sm:text-base">
        {item.title}
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-text-secondary sm:text-sm">
        {item.description}
      </p>
    </div>
  );
}

