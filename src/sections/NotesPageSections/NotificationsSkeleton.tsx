const NotificationsSkeleton = () => {
    return (
        <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-2xl border border-border bg-white p-5 shadow-[0_8px_25px_rgba(34,35,58,0.04)]"
                >
                    <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-bg" />

                        <div className="flex-1">
                            <div className="h-4 w-2/5 rounded bg-bg" />

                            <div className="mt-3 h-3 w-full rounded bg-bg" />

                            <div className="mt-2 h-3 w-4/5 rounded bg-bg" />

                            <div className="mt-4 h-3 w-1/4 rounded bg-bg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationsSkeleton;