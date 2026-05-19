import { useState } from "react";

import {
    FiInstagram,
    FiLinkedin,
    FiMail,
    FiMapPin,
    FiPhone,
    FiSend,
} from "react-icons/fi";

import ContactDropdown from "./ContactDropdown";
import ContactInfoItem from "./ContactInfoItem";
import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";
import SocialButton from "./SocialButton";

const subjects = [
    "General Inquiry",
    "Fleet Rental",
    "Corporate Services",
    "Partnership",
    "Support",
];

export default function ContactSection() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubject = (subject: string) => {
        setForm({
            ...form,
            subject,
        });

        setDropdownOpen(false);
    };

    const handleSubmit = () => {
        console.log(form);
    };

    return (
        <section data-aos="fade-up" className="min-h-screen bg-[#f0f0f8] px-4 py-12 md:px-8 lg:px-12 xl:px-20">

            {/* HEADER */}
            <div className="mb-12 text-center">

                <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
                    How can we assist you?
                </h1>

                <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500">
                    Whether you're looking for a bespoke rental experience or need help
                    managing your fleet.
                </p>
            </div>

            {/* GRID */}
            <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row">

                {/* FORM */}
                <div className="rounded-2xl bg-white p-6 shadow-sm lg:flex-[1.15]">

                    <h2 className="mb-6 text-base font-semibold text-gray-900">
                        Send a Message
                    </h2>

                    <div className="mb-4 flex flex-col gap-4 md:flex-row">

                        <ContactInput
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            placeholder="John Doe"
                            onChange={handleChange}
                        />

                        <ContactInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={form.email}
                            placeholder="john@example.com"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">

                        <ContactDropdown
                            value={form.subject}
                            options={subjects}
                            isOpen={dropdownOpen}
                            onToggle={() =>
                                setDropdownOpen(!dropdownOpen)
                            }
                            onSelect={handleSubject}
                        />
                    </div>

                    <div className="mb-5">

                        <ContactTextarea
                            label="Message"
                            name="message"
                            value={form.message}
                            placeholder="How can our concierge team help you today?"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
                    >
                        <FiSend size={15} />
                        Submit Inquiry
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-4 lg:flex-[0.85]">

                    {/* CONCIERGE */}
                    <div className="rounded-2xl bg-indigo-600 p-6 text-white">

                        <h3 className="mb-5 text-base font-semibold">
                            Direct Concierge
                        </h3>

                        <div className="flex flex-col gap-4">

                            <ContactInfoItem
                                icon={<FiPhone size={15} />}
                                label="CALL US"
                                value="+1 (888) LUXE-DRV"
                            />

                            <ContactInfoItem
                                icon={<FiMail size={15} />}
                                label="EMAIL US"
                                value="vip@luxedrive.com"
                            />
                        </div>
                    </div>

                    {/* MAP */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                        <div
                            className="relative h-32 bg-[#e8eaf0]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(150,150,200,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,200,0.25) 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                            }}
                        >
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
                                <FiMapPin
                                    size={22}
                                    className="text-indigo-600"
                                />
                            </div>
                        </div>

                        <div className="p-4">

                            <span className="mb-2 inline-block rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                                Headquarters
                            </span>

                            <p className="mb-0.5 text-sm font-semibold text-gray-900">
                                Beverly Hills Corporate Center
                            </p>

                            <p className="text-xs text-gray-500">
                                90210 Wilshire Blvd, Los Angeles, CA
                            </p>
                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex gap-3">

                        <SocialButton
                            icon={<FiInstagram size={15} />}
                            text="Instagram"
                        />

                        <SocialButton
                            icon={<FiLinkedin size={15} />}
                            text="LinkedIn"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}