import { CarCard } from "../../components/car/CarCard";

interface Props {
    cars: any[];
}

const FavoritesGrid = ({ cars }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
            {cars.map((car) => {
                if (!car?.id) {
                    return null;
                }

                return (
                    <CarCard
                        key={car.id}
                        car={car}
                    />
                );
            })}
        </div>
    );
};

export default FavoritesGrid;