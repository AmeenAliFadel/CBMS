import { FiRefreshCw } from "react-icons/fi";

interface Props {
    onRefresh: () => void;
}

const NotificationsHeader = ({ onRefresh }: Props) => {
    return (
        <div className="rounded-3xl border border-border bg-white/70 p-5 shadow-[0_10px_30px_rgba(34,35,58,0.05)] backdrop-blur-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                        Notifications
                    </p>

                    <h1 className="text-3xl font-bold tracking-[-0.03em] text-primary sm:text-4xl lg:text-[44px]">
                        Your notifications
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={onRefresh}
                    className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 text-[13px] font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary"
                >
                    <FiRefreshCw className="text-base" />
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default NotificationsHeader;