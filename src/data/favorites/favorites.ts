import type { Car } from "../carShow/CarShow";

 export const favoriteCars: Car[] = [
    {
      id: 1,
      name: "Tesla Model S",
      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
      rating: 4.9,
      fuel: "Electric",
      seats: 5,
      transmission: "Auto",
      price: 120,
      favorite: true,
      tags: ["Featured", "Luxury"],
    },

    {
      id: 2,
      name: "BMW i8",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
      rating: 4.8,
      fuel: "Hybrid",
      seats: 4,
      transmission: "Auto",
      price: 150,
      favorite: true,
      tags: ["Sport", "Premium"],
    },

    {
      id: 3,
      name: "Porsche Taycan",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      rating: 5.0,
      fuel: "Electric",
      seats: 4,
      transmission: "Auto",
      price: 170,
      favorite: true,
      tags: ["Top Rated"],
    },
  ];