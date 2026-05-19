import phone from "../../assets/HostPageImages/phone.webp";
import persons from "../../assets/HostPageImages/persons.webp";
import keys from "../../assets/HostPageImages/keys.webp";




export const  steps = [
  {
    number: "01",
    title: "Submit Request",
    description:
      "Share your vehicle details and high-quality photos. Our team reviews every submission within 24 hours to maintain marketplace quality.",
    image: phone,
    imageAlt: "Vehicle listing on a phone",
    imageClass:
      "object-contain object-center px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6",
    cardClass: "bg-[#f8e6d8]",
  },
  {
    number: "02",
    title: "Get Approved",
    description:
      "Once verified, we provide you with a hosting kit and professional listing advice to make your vehicle stand out to premium renters.",
    image: persons,
    imageAlt: "Professional host support team",
    imageClass: "object-cover object-center",
    cardClass: "bg-[#eaf4f8]",
  },
  {
    number: "03",
    title: "Start Renting",
    description:
      "Your car is live! Receive bookings, communicate with guests via the app, and watch your high-earning asset work for you.",
    image: keys,
    imageAlt: "Car keys on a surface",
    imageClass: "object-cover object-center",
    cardClass: "bg-[#101622]",
  },
];
