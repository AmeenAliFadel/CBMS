import { api } from "../../../services/axios";
import type {
    AddFavoriteResponse,
    Favorite,
    FavoriteApiResponse,
    FavoriteMessageResponse,
} from "./favoritesTypes";

function mapFavorite(apiFavorite: FavoriteApiResponse): Favorite {
    return {
        ...apiFavorite,

        car: {
            id: apiFavorite.car.id,
            title: apiFavorite.car.title,
            brand: apiFavorite.car.brand,
            model: apiFavorite.car.model,
            year: apiFavorite.car.year,
            price_per_day: apiFavorite.car.price_per_day,
            status: apiFavorite.car.status,
            color: apiFavorite.car.color,
            plate_number: apiFavorite.car.plate_number,
            description: apiFavorite.car.description,
            created_at: apiFavorite.car.created_at,

            car_type: {
                id: apiFavorite.car.car_type_id,
                name: "Car",
            },

            owner: {
                id: apiFavorite.car.user_id,
                name: "Owner",
            },

            images: {
                main:
                    apiFavorite.car.images?.find(
                        (image) => image.is_main
                    )?.path ?? null,

                gallery:
                    apiFavorite.car.images?.map(
                        (image) => image.path
                    ) ?? [],
            },

            features: [],
        },
    };
}

export async function getFavoritesRequest(): Promise<Favorite[]> {
    const response = await api.get<{
        data: FavoriteApiResponse[];
    }>("/v1/favorites");

    return response.data.data.map(mapFavorite);
}

export async function addFavoriteRequest(
    carId: number
): Promise<Favorite> {
    const response = await api.post<AddFavoriteResponse>(
        "/v1/favorites",
        {
            car_id: carId,
        }
    );

    return mapFavorite(response.data.data);
}

export async function removeFavoriteRequest(
    carId: number
): Promise<FavoriteMessageResponse> {
    const response = await api.delete<FavoriteMessageResponse>(
        "/v1/favorites",
        {
            data: {
                car_id: carId,
            },
        }
    );

    return response.data;
}