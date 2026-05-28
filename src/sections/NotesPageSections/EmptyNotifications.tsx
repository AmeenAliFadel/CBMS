import { HiOutlineBell } from "react-icons/hi2";

const EmptyNotifications = () => {
    return (
        <div className="flex min-h-105 items-center justify-center rounded-3xl border border-border bg-white/75 p-6 shadow-[0_10px_30px_rgba(34,35,58,0.05)] backdrop-blur-sm">
            <div className="relative text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HiOutlineBell className="h-10 w-10" />
                </div>

                <h2 className="text-2xl font-bold text-primary/70 sm:text-3xl">
                    No Notifications Yet
                </h2>
            </div>
        </div>
    );
};

export default EmptyNotifications;