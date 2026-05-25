function SkeletonBlock({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />;
}

export default function CarDetailsSkeleton() {
    return (
        <div>
            <section className="w-full px-10 lg:px-25 py-6 lg:py-10">
                <div className="w-full">
                    <div className="hidden sm:grid grid-cols-2 gap-2 h-150 rounded-2xl overflow-hidden">
                        <SkeletonBlock className="h-full w-full rounded-xl" />
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                            <SkeletonBlock className="h-full w-full rounded-[10px]" />
                            <SkeletonBlock className="h-full w-full rounded-[10px]" />
                            <SkeletonBlock className="h-full w-full rounded-[10px]" />
                            <SkeletonBlock className="h-full w-full rounded-[10px]" />
                        </div>
                    </div>

                    <div className="sm:hidden space-y-2">
                        <SkeletonBlock className="h-70 w-full rounded-2xl" />
                        <div className="grid grid-cols-2 gap-2">
                            <SkeletonBlock className="h-35 w-full rounded-xl" />
                            <SkeletonBlock className="h-35 w-full rounded-xl" />
                            <SkeletonBlock className="h-35 w-full rounded-xl" />
                            <SkeletonBlock className="h-35 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-10 lg:px-25 py-6 lg:py-10">
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <div className="flex-1 flex flex-col gap-8 w-full">
                        <div>
                            <SkeletonBlock className="h-12 lg:h-16 w-3/4 rounded-2xl" />
                            <div className="mt-4 flex items-center gap-3">
                                <SkeletonBlock className="h-5 w-24 rounded-full" />
                                <SkeletonBlock className="h-5 w-5 rounded-full" />
                                <SkeletonBlock className="h-5 w-28 rounded-full" />
                            </div>
                        </div>

                        <div className="flex flex-wrap lg:gap-4 gap-2">
                            <SkeletonBlock className="h-28 w-full lg:w-45 rounded-xl" />
                            <SkeletonBlock className="h-28 w-full lg:w-45 rounded-xl" />
                            <SkeletonBlock className="h-28 w-full lg:w-45 rounded-xl" />
                            <SkeletonBlock className="h-28 w-full lg:w-45 rounded-xl" />
                        </div>

                        <div>
                            <SkeletonBlock className="h-8 w-56 rounded-xl mb-3" />
                            <SkeletonBlock className="h-5 w-full rounded-xl mb-2" />
                            <SkeletonBlock className="h-5 w-11/12 rounded-xl mb-2" />
                            <SkeletonBlock className="h-5 w-5/6 rounded-xl" />
                        </div>

                        <div className="w-full lg:w-fit flex items-center justify-between gap-3 lg:gap-60 p-3 lg:p-5 bg-white border border-gray-200 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <SkeletonBlock className="w-14 h-14 rounded-full" />
                                <div className="space-y-2">
                                    <SkeletonBlock className="h-3 w-20 rounded-full" />
                                    <SkeletonBlock className="h-5 w-40 rounded-full" />
                                    <SkeletonBlock className="h-3 w-56 rounded-full" />
                                </div>
                            </div>
                            <SkeletonBlock className="h-10 w-24 rounded-xl" />
                        </div>
                    </div>

                    <aside className="w-full lg:w-90 shrink-0">
                        <div className="sticky top-2 sm:top-6 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-6 w-full mx-auto sm:mx-0">
                            <SkeletonBlock className="h-10 w-32 rounded-xl mb-5" />
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <SkeletonBlock className="h-16 rounded-xl" />
                                <SkeletonBlock className="h-16 rounded-xl" />
                            </div>
                            <SkeletonBlock className="h-14 rounded-xl mb-5" />
                            <div className="space-y-3 border-t border-gray-100 pt-4 mb-5">
                                <SkeletonBlock className="h-5 w-full rounded-xl" />
                                <SkeletonBlock className="h-5 w-full rounded-xl" />
                                <SkeletonBlock className="h-5 w-full rounded-xl" />
                                <SkeletonBlock className="h-6 w-full rounded-xl" />
                            </div>
                            <SkeletonBlock className="h-14 rounded-xl" />
                            <SkeletonBlock className="h-4 w-40 rounded-full mx-auto mt-3" />
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}