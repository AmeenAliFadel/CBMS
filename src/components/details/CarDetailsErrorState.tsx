interface CarDetailsErrorStateProps {
    message: string;
    onRetry: () => void;
}

export default function CarDetailsErrorState({
    message,
    onRetry,
}: CarDetailsErrorStateProps) {
    return (
        <section className="w-full px-10 lg:px-25 py-10">
            <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center shadow-sm">
                <p className="text-lg font-bold text-red-700">Unable to load car details</p>
                <p className="mt-2 text-sm text-red-600">{message}</p>
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
                >
                    Retry
                </button>
            </div>
        </section>
    );
}