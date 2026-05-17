import Seats from "../../assets/DetailsImgs/Seats.svg"
import mph from "../../assets/DetailsImgs/mph.svg"
import speed from "../../assets/DetailsImgs/speed.svg"
import Transmission from "../../assets/DetailsImgs/Transmission.svg"


export interface CarSpec {
    icon: string;
    value: string;
    label: string;
}
export const specs: CarSpec[] = [
    { icon: speed, value: "191 mph", label: "Top Speed" },
    { icon: mph, value: "3.5s", label: "0–60 mph" },
    { icon: Transmission, value: "PDK 8-spd", label: "Transmission" },
    { icon: Seats, value: "4 Seater", label: "Seats" },
];