import profile from "../../assets/DetailsImgs/user.png"

export interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    text: string;
    date?: string;
}

export const allReviews: Review[] = [
    {
        id: 1,
        name: "Marcus Chen",
        avatar: profile,
        rating: 5,
        text: "Incredible car and even better service. Julian made the pickup seamless. The car looks amazing and handled the PCH perfectly.",
        date: "Oct 2024",
    },
    {
        id: 2,
        name: "Scott Jenkins",
        avatar: profile,
        rating: 4,
        text: "Perfect for our anniversary trip. The car sounded amazing and we couldn't have asked for a better experience.",
        date: "Sep 2024",
    },
    {
        id: 3,
        name: "Priya Kapoor",
        avatar: "",
        rating: 4,
        text: "Absolutely spotless. Julian was super responsive and the car was exactly as advertised. Will rent again!",
        date: "Aug 2024",
    },
    {
        id: 4,
        name: "Tyler Moss",
        avatar: profile,
        rating: 5,
        text: "Great car overall, just a small scratch on the bumper that was already documented. Drive was incredible on Highway 1.",
        date: "Jul 2024",
    },
];