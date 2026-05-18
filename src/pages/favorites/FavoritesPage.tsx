import { FiHeart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

import { favoriteCars } from "../../data/favorites/favorites";
import { CarCard } from "../../components/car/CarCard";

export default function FavoritesPage() {

  return (
    <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20">

      {/* Header */}
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

          <HiOutlineSparkles
            className="text-primary"
            size={18}
          />

          {favoriteCars.length} Cars Saved

        </div>

      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">

        {favoriteCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
          />
        ))}

      </div>

    </section>
  );
}