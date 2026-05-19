import { useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  const isFormValid = useMemo(() => {
    return (
      form.fullName.trim().length > 2 &&
      form.email.includes("@") &&
      form.message.trim().length > 10
    );
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubject = (subject: string) => {
    setForm((prev) => ({ ...prev, subject }));
    setDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1200));
      console.log("Submitted:", form);

      setForm({
        fullName: "",
        email: "",
        subject: subjects[0],
        message: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#f6f7fb] to-[#eef1f7] px-6 py-20 md:px-10 lg:px-20">

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      {/* HEADER */}
      <div className="relative mx-auto mb-16 max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
          How can we assist you?
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">
          Premium concierge support for rentals, fleet management and partnerships.
        </p>
      </div>

      {/* GRID */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">

        {/* FORM */}
        <div className="lg:col-span-7 rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-2xl">

          <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Send a message
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          <div className="mt-5">
            <ContactDropdown
              value={form.subject}
              options={subjects}
              isOpen={dropdownOpen}
              onToggle={() => setDropdownOpen((p) => !p)}
              onSelect={handleSubject}
            />
          </div>

          <div className="mt-5">
            <ContactTextarea
              label="Message"
              name="message"
              value={form.message}
              placeholder="Tell us how we can help you..."
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-white shadow-lg transition
            hover:bg-primary/90 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiSend size={16} className={loading ? "animate-pulse" : ""} />
            {loading ? "Sending..." : "Submit Inquiry"}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* CONCIERGE CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-7 text-white shadow-2xl">

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              Direct Concierge
            </h3>

            <div className="space-y-5">
              <ContactInfoItem
                icon={<FiPhone size={16} />}
                label="Call us"
                value="+1 (888) LUXE-DRV"
              />

              <ContactInfoItem
                icon={<FiMail size={16} />}
                label="Email"
                value="vip@luxedrive.com"
              />
            </div>
          </div>

          {/* MAP CARD */}
          <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition hover:shadow-2xl">

            {/* header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
              <span className="text-xs font-semibold tracking-wide text-gray-500">
                LOCATION
              </span>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary">
                HQ
              </span>
            </div>

            {/* map */}
            <div className="relative h-44 bg-gradient-to-br from-[#e9ecf3] to-[#dfe5f1]">

              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(120,120,160,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,160,0.25)_1px,transparent_1px)] [background-size:26px_26px]" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110">

                <div className="relative">
                  <FiMapPin size={28} className="text-primary drop-shadow-lg" />

                  <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/20" />
                </div>
              </div>
            </div>

            {/* info */}
            <div className="space-y-1 p-5">

              <p className="text-sm font-semibold text-gray-900">
                Beverly Hills Corporate Center
              </p>

              <p className="text-xs text-gray-500">
                90210 Wilshire Blvd, Los Angeles, CA
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Open for visits & appointments
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-3">
            <SocialButton icon={<FiInstagram size={16} />} text="Instagram" />
            <SocialButton icon={<FiLinkedin size={16} />} text="LinkedIn" />
          </div>

        </div>
      </div>
    </section>
  );
}