export default function CarCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
            <div className="w-full h-56 bg-gray-200" />
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-12 bg-gray-200 rounded" />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="h-6 w-20 bg-gray-200 rounded" />
                    <div className="h-9 w-20 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}