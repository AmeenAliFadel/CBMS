import carr from "../../assets/CarShowImgs/carr.svg";

export interface Car {
    id: number;
    name: string;
    rating: number;
    price: number;
    seats: number;
    transmission: string;
    tags: string[];
    image: string;
    favorite?: boolean;
    fuel: string;
}

export const cars: Car[] = [
    {
        id: 1,
        name: "Porsche Taycan Turbo",
        rating: 4.9,
        price: 280,
        seats: 4,
        transmission: "Automatic",
        tags: ["Instant Book", "Delivery"],
        image: carr,
        favorite: false,
        fuel: "Electric"
    },
    {
        id: 2,
        name: "BMW M4 Competition",
        rating: 4.6,
        price: 285,
        seats: 4,
        transmission: "Automatic",
        tags: ["Premium Host"],
        image: carr,
        favorite: false,
        fuel: "Electric"
    },
    {
        id: 3,
        name: "Ferrari F8 Spider",
        rating: 5.0,
        price: 1200,
        seats: 2,
        transmission: "Automatic",
        tags: ["Airport Pickup"],
        image: carr,
        favorite: false,
        fuel: "Electric"
    },
    {
        id: 4,
        name: "Range Rover SV",
        rating: 4.7,
        price: 380,
        seats: 5,
        transmission: "Automatic",
        tags: ["Car-Trek", "Free Delivery"],
        image: carr,
        favorite: false,
        fuel: "Electric"
    },
    {
        id: 5,
        name: "Audi R8 V10",
        rating: 4.8,
        price: 360,
        seats: 2,
        tags: ["Track Package"],
        image: carr,
        transmission: "Automatic",
        favorite: false,
        fuel: "Electric"
    },
    {
        id: 6,
        name: "Mercedes-Benz G63",
        rating: 4.9,
        price: 500,
        seats: 5,
        transmission: "Automatic",
        tags: ["Instant Book"],
        image: carr,
        favorite: false,
        fuel: "Electric"
    },
];