interface Props {
    total: number;
    unread: number;
    hostUpdates: number;
}

const NotificationsStats = ({
    total,
    unread,
    hostUpdates,
}: Props) => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard title="Total" value={total} />
            <StatCard title="Unread" value={unread} />
            <StatCard title="Host updates" value={hostUpdates} />
        </div>
    );
};

export default NotificationsStats;

interface CardProps {
    title: string;
    value: number;
}

const StatCard = ({ title, value }: CardProps) => {
    return (
        <div className="rounded-2xl border border-border bg-background/70 p-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                {title}
            </p>

            <p className="mt-2 text-2xl font-bold text-text-primary">
                {value}
            </p>
        </div>
    );
};