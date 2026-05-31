import {
  selectCarDetailsMainImage,
  selectCarDetailsSubtitle,
  selectCarDetailsTitle,
} from "../../app/features/carDetails/carDetailsSelectors";
import { useAppSelector } from "../../app/hooks";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";

export function CarCard() {
  const image = useAppSelector(selectCarDetailsMainImage);
  const title = useAppSelector(selectCarDetailsTitle);
  const subtitle = useAppSelector(selectCarDetailsSubtitle);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_14px_40px_rgba(99,102,241,0.1)] ring-1 ring-slate-200/70">
      <div className="relative h-48">
        <img
          src={image || FALLBACK_IMAGE}
          alt={title || "Car"}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">
            {title || "Selected Car"}
          </h3>
          <p className="text-xs text-white/80">
            {subtitle || "Loading booking details"}
          </p>
        </div>
      </div>
    </div>
  );
}