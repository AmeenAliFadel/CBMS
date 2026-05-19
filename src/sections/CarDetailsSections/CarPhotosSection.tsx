import more from '../../assets/DetailsImgs/CarsS/More-Photos.png';
import Porsche911 from '../../assets/DetailsImgs/CarsS/Porsche911.png';
import Interior from '../../assets/DetailsImgs/CarsS/Interior-Details.png';
import Rear from '../../assets/DetailsImgs/CarsS/Rear-Profile.png';
import Wheel from '../../assets/DetailsImgs/CarsS/Wheel Detail.png';
const images = [
    Porsche911,
    Interior,
    Rear,
    Wheel,
    more,
];

function CarPhotosSection() {
    return (
        <section className="w-full px-10  lg:px-25 py-6 lg:py-10">
            <div className="w-full ">

                {/* Desktop / tablet layout */}
                <div className="hidden sm:grid grid-cols-2 gap-2 h-150 rounded-2xl overflow-hidden">

                    {/* Main image */}
                    <div className="h-full">
                        <img src={images[0]} alt="Main car" className="w-full h-full object-cover rounded-xl"/>
                    </div>
                    {/* Bottom 4 images */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                        {images.slice(1, 5).map((img, i) => (
                            <div key={i} className="overflow-hidden">
                                <img src={img} alt={`Car ${i + 2}`} className="rounded-[10px] w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile layout */}
                <div className="sm:hidden space-y-2">

                    {/* Main image */}
                    <div className="rounded-2xl overflow-hidden">
                        <img src={images[0]} alt="Main car" className="w-full h-70 object-cover" />
                    </div>
                    {/* Bottom 4 images */}
                    <div className="grid grid-cols-2 gap-2">
                        {images?.slice(1, 5).map((img, i) => (
                            <div key={i} className="rounded-xl overflow-hidden">
                                <img src={img} alt={`Car ${i + 2}`} className="w-full h-35 object-cover"/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CarPhotosSection
