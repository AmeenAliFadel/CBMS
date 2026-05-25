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
                className={`${className} bg-gray-100 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-500`}
            >
                No image available
            </div>
        );
    }

    return (
        <div className={`${className} overflow-hidden`}>
            <img src={resolvedSrc} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
}

function CarPhotosSection({ car }: CarPhotosSectionProps) {
    const imageSlots = buildImageSlots(car);

    return (
        <section data-aos="fade-up" className="w-full px-10 lg:px-25 py-6 lg:py-10">
            <div className="w-full">
                <div className="hidden sm:grid grid-cols-2 gap-2 h-150 rounded-2xl overflow-hidden">
                    <ImageSlot
                        src={imageSlots[0]}
                        alt={`${car.title} main image`}
                        className="h-full w-full rounded-xl"
                    />

                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        <ImageSlot
                            src={imageSlots[1]}
                            alt={`${car.title} image 2`}
                            className="rounded-[10px] w-full h-full"
                        />
                        <ImageSlot
                            src={imageSlots[2]}
                            alt={`${car.title} image 3`}
                            className="rounded-[10px] w-full h-full"
                        />
                        <ImageSlot
                            src={imageSlots[3]}
                            alt={`${car.title} image 4`}
                            className="rounded-[10px] w-full h-full"
                        />
                        <ImageSlot
                            src={imageSlots[4]}
                            alt={`${car.title} image 5`}
                            className="rounded-[10px] w-full h-full"
                        />
                    </div>
                </div>

                <div className="sm:hidden space-y-2">
                    <ImageSlot
                        src={imageSlots[0]}
                        alt={`${car.title} main image`}
                        className="rounded-2xl w-full h-70"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <ImageSlot
                            src={imageSlots[1]}
                            alt={`${car.title} image 2`}
                            className="rounded-xl w-full h-35"
                        />
                        <ImageSlot
                            src={imageSlots[2]}
                            alt={`${car.title} image 3`}
                            className="rounded-xl w-full h-35"
                        />
                        <ImageSlot
                            src={imageSlots[3]}
                            alt={`${car.title} image 4`}
                            className="rounded-xl w-full h-35"
                        />
                        <ImageSlot
                            src={imageSlots[4]}
                            alt={`${car.title} image 5`}
                            className="rounded-xl w-full h-35"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarPhotosSection;