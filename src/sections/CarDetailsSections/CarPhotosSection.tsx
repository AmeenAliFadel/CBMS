import type { Car } from "../../app/features/cars/carsTypes";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

interface CarPhotosSectionProps {
    car: Car;
}

function buildImageSlots(car: Car): Array<string | null> {
    const rawImages = [car.images.main, ...(car.images.gallery ?? [])].filter(
        (image): image is string => Boolean(image)
    );

    const uniqueImages = Array.from(new Set(rawImages));

    return Array.from({ length: 5 }, (_, index) => uniqueImages[index] ?? null);
}

function ImageSlot({
    src,
    alt,
    className,
}: {
    src: string | null;
    alt: string;
    className: string;
}) {
    const resolvedSrc = src ? resolveImageUrl(src) : "";

    if (!resolvedSrc) {
        return (
            <div
                className={`${className} flex items-center justify-center border border-dashed border-gray-200 bg-gray-100 text-sm text-gray-500`}
            >
                No image available
            </div>
        );
    }

    return (
        <div className={`${className} overflow-hidden`}>
            <img
                src={resolvedSrc}
                alt={alt}
                className="h-full w-full object-cover"
            />
        </div>
    );
}

function CarPhotosSection({ car }: CarPhotosSectionProps) {
    const imageSlots = buildImageSlots(car);

    return (
        <section data-aos="fade-up" className="w-full py-4 sm:py-6 lg:py-8">
            <div className="w-full">
                <div className="hidden min-h-105 gap-2 overflow-hidden rounded-2xl sm:grid sm:min-h-130 sm:grid-cols-2 sm:gap-3 lg:min-h-155 lg:gap-4">
                    <ImageSlot
                        src={imageSlots[0]}
                        alt={`${car.title} main image`}
                        className="h-full w-full min-h-65 rounded-2xl"
                    />

                    <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 sm:gap-3 lg:gap-4">
                        <ImageSlot
                            src={imageSlots[1]}
                            alt={`${car.title} image 2`}
                            className="h-full w-full rounded-[10px]"
                        />
                        <ImageSlot
                            src={imageSlots[2]}
                            alt={`${car.title} image 3`}
                            className="h-full w-full rounded-[10px]"
                        />
                        <ImageSlot
                            src={imageSlots[3]}
                            alt={`${car.title} image 4`}
                            className="h-full w-full rounded-[10px]"
                        />
                        <ImageSlot
                            src={imageSlots[4]}
                            alt={`${car.title} image 5`}
                            className="h-full w-full rounded-[10px]"
                        />
                    </div>
                </div>

                <div className="space-y-2 sm:hidden">
                    <ImageSlot
                        src={imageSlots[0]}
                        alt={`${car.title} main image`}
                        className="h-70 w-full rounded-2xl"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <ImageSlot
                            src={imageSlots[1]}
                            alt={`${car.title} image 2`}
                            className="h-35 w-full rounded-xl"
                        />
                        <ImageSlot
                            src={imageSlots[2]}
                            alt={`${car.title} image 3`}
                            className="h-35 w-full rounded-xl"
                        />
                        <ImageSlot
                            src={imageSlots[3]}
                            alt={`${car.title} image 4`}
                            className="h-35 w-full rounded-xl"
                        />
                        <ImageSlot
                            src={imageSlots[4]}
                            alt={`${car.title} image 5`}
                            className="h-35 w-full rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarPhotosSection;