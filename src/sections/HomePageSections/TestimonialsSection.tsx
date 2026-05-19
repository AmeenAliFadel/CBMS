import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

import testImg from "../../assets/testimonials/testimonial-car.webp";
import avatarImg from "../../assets/testimonials/avatar.png";

export default function TestimonialsSection() {
    return (
        <section className="w-full bg-[#FAF9FF] px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#131B2E]">
                    Loved by Hosts & Guests
                </h2>

                <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">
                    {/* Left testimonial card */}
                    <div data-aos="fade-up" className="lg:col-span-2 rounded-3xl bg-[#E6E9FF] p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-70 sm:min-h-80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div>
                            <div className="flex items-center gap-1 text-[#00687A]">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <FaStar key={index} className="text-[14px] sm:text-[15px]" />
                                ))}
                            </div>

                            <p className="mt-6 text-sm sm:text-[15px] leading-7 text-[#34344A] italic max-w-[320px]">
                                "LuxeDrive has completely changed how I think about passive income.
                                My Porsche now pays for its own lease and more."
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-3">
                            <img
                                src={avatarImg}
                                alt="James Wilson"
                                className="w-11 h-11 rounded-full object-cover"
                            />

                            <div>
                                <h4 className="text-sm font-semibold text-[#131B2E]">
                                    James Wilson
                                </h4>
                                <p className="text-xs text-[#5F6275]">
                                    Power Host • 3 Cars
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right image card */}
                    <div data-aos="fade-up" className="lg:col-span-3 relative overflow-hidden rounded-3xl min-h-70 sm:min-h-80 lg:min-h-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <img
                            src={testImg}
                            alt="Driving experience"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                        <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex items-end">
                            <div className="max-w-130 text-white">
                                <FaQuoteLeft className="text-2xl sm:text-3xl mb-3 opacity-90" />
                                <p className="text-base sm:text-lg lg:text-2xl font-medium leading-7 sm:leading-8">
                                    "The easiest rental experience I’ve ever had. No paperwork, just
                                    pure driving pleasure."
                                </p>

                                <p className="mt-3 text-xs sm:text-sm text-white/80">
                                    — Sarah Jenkins, Guest
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}