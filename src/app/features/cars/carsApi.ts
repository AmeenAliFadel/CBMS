import { api } from "../../../services/axios";
import type { CarsFilters, CarsResponse } from "./carsTypes";

export async function getCars(
    filters: Partial<CarsFilters & { page: number }> = {}
) {
    const params: Record<string, string | number> = {};

    if (filters.page) {
        params.page = filters.page;
    }

    if (filters.carType) {
        params.car_type = filters.carType;
    }

    if (filters.model?.trim()) {
        params.model = filters.model.trim();
    }

    if (typeof filters.maxPrice === "number" && Number.isFinite(filters.maxPrice)) {
        params.max_price = filters.maxPrice;
    }

    if (typeof filters.page === "number") {
        params.page = filters.page;
    }

    const response = await api.get<CarsResponse>("/v1/cars", {
        params,
    });

    return response.data;
}
export async function getFeaturedCars() {
    const response = await api.get<CarsResponse>("/v1/cars");

    return response.data.data.slice(0, 6);
}