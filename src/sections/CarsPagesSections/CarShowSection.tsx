import FilterCard from "../../components/car/FilterCard";
import { CarCard } from "../../components/car/CarCard";
import { cars } from "../../data/carShow/CarShow";

function CarShowSection() {
  return (
    <div className="px-10 md:px-6.25 lg:px-25 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filter */}
        <div className="w-full lg:w-70 shrink-0">
          <FilterCard />
        </div>

        {/* Cars Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default CarShowSection;
