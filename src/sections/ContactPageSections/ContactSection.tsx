import { useState } from "react";
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiInstagram,
    FiLinkedin,
    FiChevronDown,
    FiSend,
} from "react-icons/fi";

const subjects = [
    "General Inquiry",
    "Fleet Rental",
    "Corporate Services",
    "Partnership",
    "Support",
];

export default function ContactSection() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubject = (subject: string) => {
        setForm({ ...form, subject });
        setDropdownOpen(false);
    };

    const handleSubmit = () => {
        console.log("Form submitted:", form);
    };

    return (
        <section className="min-h-screen bg-[#f0f0f8] px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 xl:px-20 xl:py-24 font-sans">

            {/* ── Header ── */}
            <div className="text-center mb-10 md:mb-12">
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                    How can we assist you?
                </h1>
                <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                    Whether you're looking for a bespoke rental experience or need help
                    managing your fleet, our concierge team is at your disposal 24/7.
                </p>
            </div>

            {/* ── Grid ── */}
            <div className="flex flex-col lg:flex-row gap-5 max-w-300 mx-auto items-start">

                {/* ── Form Card ── */}
                <div className="w-full lg:flex-[1.15] bg-white rounded-2xl shadow-sm p-6 md:p-8 xl:p-10">
                    <h2 className="text-base font-semibold text-gray-900 mb-6">
                        Send a Message
                    </h2>

                    {/* Full Name + Email */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-xs font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-600 transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                            <label className="text-xs font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Subject Dropdown */}
                    <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-xs font-medium text-gray-700">Subject</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-full flex items-center justify-between px-3.5 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 cursor-pointer hover:border-indigo-600 transition-colors"
                            >
                                <span>{form.subject}</span>
                                <FiChevronDown
                                    size={16}
                                    className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-1 list-none m-0">
                                    {subjects.map((s) => (
                                        <li
                                            key={s}
                                            onClick={() => handleSubject(s)}
                                            className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${form.subject === s
                                                    ? "bg-indigo-50 text-indigo-600 font-medium"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 mb-5">
                        <label className="text-xs font-medium text-gray-700">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="How can our concierge team help you today?"
                            className="w-full min-h-30 xl:min-h-37.5 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-600 transition-colors resize-y font-sans"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none"
                    >
                        <FiSend size={15} />
                        Submit Inquiry
                    </button>
                </div>

                {/* ── Info Column ── */}
                <div className="w-full lg:flex-[0.85] flex flex-col gap-4">

                    {/* Concierge Card */}
                    <div className="bg-indigo-600 rounded-2xl p-6 md:p-7 text-white">
                        <h3 className="text-base font-semibold mb-5">Direct Concierge</h3>

                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <FiPhone size={15} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-semibold tracking-widest text-white/60 mb-0.5">
                                    CALL US
                                </span>
                                <p className="text-sm font-semibold m-0">+1 (888) LUXE-DRV</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <FiMail size={15} />
                            </div>
                            <div>
                                <span className="block text-[10px] font-semibold tracking-widest text-white/60 mb-0.5">
                                    EMAIL US
                                </span>
                                <p className="text-sm font-semibold m-0">vip@luxedrive.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div
                            className="relative h-32 bg-[#e8eaf0]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(150,150,200,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,200,0.25) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                            }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]">
                                <FiMapPin size={22} className="text-indigo-600" />
                            </div>
                        </div>
                        <div className="p-4">
                            <span className="inline-block bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide mb-2">
                                Headquarters
                            </span>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">
                                Beverly Hills Corporate Center
                            </p>
                            <p className="text-xs text-gray-500 m-0">
                                90210 Wilshire Blvd, Los Angeles, CA
                            </p>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="flex gap-3">
                        <a
                            href="#"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors no-underline"
                        >
                            <FiInstagram size={15} />
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors no-underline"
                        >
                            <FiLinkedin size={15} />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}