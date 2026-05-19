import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { faqData } from "../../data/faq/faqData";

export default function Faq() {
    const [openId, setOpenId] = useState<number | null>(1);

    const toggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section data-aos="fade-up" className="bg-[#f0f0f8] px-4 py-12 md:px-8 md:py-16 lg:px-12 xl:px-20 xl:py-20 font-sans">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                    Common Questions
                </h2>
                <p className="text-sm md:text-base text-gray-500">
                    Quick answers to frequently asked concierge inquiries.
                </p>
            </div>

            {/* Accordion */}
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
                {faqData.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        >
                            <button
                                type="button"
                                onClick={() => toggle(item.id)}
                                className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer border-none bg-transparent"
                            >
                                <span className="text-sm md:text-base font-semibold text-gray-900 pr-4">
                                    {item.question}
                                </span>
                                <FiChevronDown
                                    size={18}
                                    className={`shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Answer panel */}
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm text-gray-500 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Link */}
            <div className="text-center mt-8">
                <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors no-underline"
                >
                    View All Documentation
                </a>
            </div>
        </section>
    );
}