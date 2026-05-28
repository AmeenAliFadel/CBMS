interface Props {
    error: string;
}

const FavoritesError = ({ error }: Props) => {
    return (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
        </div>
    );
};

export default FavoritesError;