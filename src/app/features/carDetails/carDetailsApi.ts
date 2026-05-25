import { api } from "../../../services/axios";
import type { CarDetailsResponse } from "./carDetailsTypes";

export async function getCarDetails(carId: number) {
    const response = await api.get<CarDetailsResponse>(`/v1/cars/${carId}`);
    return response.data;
}