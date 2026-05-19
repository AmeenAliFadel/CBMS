import bmw from "../../assets/CarSliderImgs/BMW.webp";

export interface CarsSliderItem {
    id: number;
    title: string;
    rating: string;
    trips: string;
    price: string;
    image: string;
    badge: string;
    transmission: string;
    fuel: string;
    favorite?: boolean;
}

export const carsSliderData: CarsSliderItem[] = [
    {
        id: 1,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
    {
        id: 2,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
    {
        id: 3,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
    {
        id: 4,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
    {
        id: 5,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
    {
        id: 6,
        title: "BMW M4 Competition",
        rating: "4.9",
        trips: "42",
        price: "$210",
        image: bmw,
        badge: "Top Rated",
        transmission: "Automatic",
        fuel: "Hybrid",
        favorite: false,
    },
];