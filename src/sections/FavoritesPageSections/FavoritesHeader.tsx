import { FiHeart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

interface Props {
    total: number;
}

const FavoritesHeader = ({ total }: Props) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <FiHeart size={22} />
                    </div>

                    <h1 className="text-3xl font-bold text-text-primary">
                        Favorite Cars
                    </h1>
                </div>

                <p className="text-text-secondary">
                    Your saved luxury and premium vehicles.
                </p>
            </div>

            <div className="bg-surface border border-border shadow-sm rounded-2xl px-5 py-3 text-sm text-text-secondary flex items-center gap-2">
                <HiOutlineSparkles className="text-primary" size={18} />
                {total} Cars Saved
            </div>
        </div>
    );
};

export default FavoritesHeader;