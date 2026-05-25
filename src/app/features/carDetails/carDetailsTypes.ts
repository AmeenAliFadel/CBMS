import type { Car } from "../cars/carsTypes";

export interface CarDetailsResponse {
    data: Car;
}

export interface CarDetailsState {
    item: Car | null;
    loading: boolean;
    error: string | null;
}