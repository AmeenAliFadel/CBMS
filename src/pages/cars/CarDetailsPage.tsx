import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CarDetailsErrorState from "../../components/details/CarDetailsErrorState";
import CarDetailsSkeleton from "../../components/details/CarDetailsSkeleton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCarDetails,
  resetCarDetails,
} from "../../app/features/carDetails/carDetailsSlice";
import {
  selectCarDetailsError,
  selectCarDetailsItem,
  selectCarDetailsLoading,
} from "../../app/features/carDetails/carDetailsSelectors";
import CarPhotosSection from "../../sections/CarDetailsSections/CarPhotosSection";
import ContentCarSection from "../../sections/CarDetailsSections/ContentCarSection";
import { ReviewsSection } from "../../sections/CarDetailsSections/ReviewsSection";

export default function CarDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();

  const car = useAppSelector(selectCarDetailsItem);
  const loading = useAppSelector(selectCarDetailsLoading);
  const error = useAppSelector(selectCarDetailsError);

  const carId = id ? Number(id) : Number.NaN;
  const isValidCarId = Number.isInteger(carId) && carId > 0;

  useEffect(() => {
    if (!isValidCarId) {
      dispatch(resetCarDetails());
      return;
    }

    dispatch(resetCarDetails());
    dispatch(fetchCarDetails(carId));
  }, [dispatch, carId, isValidCarId]);

  const handleRetry = () => {
    if (!isValidCarId) return;

    dispatch(resetCarDetails());
    dispatch(fetchCarDetails(carId));
  };

  if (loading && !car) {
    return <CarDetailsSkeleton />;
  }

  if (!isValidCarId) {
    return (
      <CarDetailsErrorState
        message="The car id in the URL is invalid."
        onRetry={handleRetry}
      />
    );
  }

  if (error && !car) {
    return <CarDetailsErrorState message={error} onRetry={handleRetry} />;
  }

  if (!car) {
    return (
      <CarDetailsErrorState
        message="Car data is unavailable."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:gap-8 lg:px-8 lg:py-8">
        <CarPhotosSection car={car} />
        <ContentCarSection car={car} />
        <ReviewsSection />
      </div>
    </div>
  );
}