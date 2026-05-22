import { api } from "../../../services/axios";
import type { CarsFilters, CarsResponse } from "./carsTypes";

export async function getCars(filters: Partial<CarsFilters> = {}) {
    const params: Record<string, string | number> = {};

    if (filters.carType) {
        params.car_type = filters.carType;
    }

    if (filters.model?.trim()) {
        params.model = filters.model.trim();
    }

    if (typeof filters.maxPrice === "number" && Number.isFinite(filters.maxPrice)) {
        params.max_price = filters.maxPrice;
    }

    const response = await api.get<CarsResponse>("/v1/cars", { params });

    return response.data;
}