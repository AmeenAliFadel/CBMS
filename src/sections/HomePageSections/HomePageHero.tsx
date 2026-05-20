import { FaArrowRight } from "react-icons/fa";
import icon from "../../assets/HeroImg/spanIcon.svg";
import heroImg from "../../assets/HeroImg/Luxury Sports Car.webp";
import { Link } from "react-router-dom";

export default function HomePageHero() {
    return (
        <section className="w-full py-12 lg:px-10 lg:py-18">
            <div className="max-w-360 mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">

                {/* Left Side */}
                <div className="w-full lg:w-1/2 flex flex-col items-start gap-5" data-aos="fade-up">

                    <span className="flex items-center gap-1 px-4 py-1 bg-[#4648D41A] text-[#4648D4] text-xs font-medium rounded-3xl">
                        <img src={icon} alt="icon" />
                        World's Leading P2P Luxury Car Marketplace
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-tight text-[#131B2E]">
                        Drive the{" "}
                        <span className="text-[#4648D4]">Extraordinary</span>
                        <br />
                        Every Day.
                    </h1>

                    <p className="text-base sm:text-lg text-[#464554] max-w-xl">
                        Skip the rental counter. Access the world's most prestigious fleet
                        of privately owned vehicles, from electric innovators to vintage
                        icons.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">

                        <Link
                            to="/cars"
                            className="flex justify-center items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#9E00B5] to-[#4648D4]"
                        >
                            Browse Cars
                            <FaArrowRight />
                        </Link>
                        <Link
                            to="/become-host"
                            className="px-8 py-4 rounded-xl text-center text-sm font-semibold text-primary bg-[#DAE2FD] border border-[#4648D433]"
                        >
                            Become a Host
                        </Link>
                    </div>
                </div>

                {/* Right Side */}
                <div data-aos="fade-up" className="w-full lg:w-1/2 border-4 rounded-2xl border-primary bg-primary p-[1px]  shadow-primary shadow-xl">
                    <img
                        className="w-full object-contain rounded-2xl "
                        src={heroImg}
                        alt="Luxury Sports Car"
                    />
                </div>

            </div>
        </section>
    );
}