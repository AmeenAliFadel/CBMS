import type { Car } from "../cars/carsTypes";

export interface FavoriteImageResponse {
    id: number;
    path: string;
    is_main: boolean;
}

export interface FavoriteCarResponse {
    id: number;
    title: string;
    user_id: number;
    car_type_id: number;
    brand: string;
    model: string;
    year: number;
    color: string | null;
    plate_number: string | null;
    price_per_day: string;
    status: string;
    rating_count: number;
    rating_sum: number;
    average_rating: string;
    latitude: number | null;
    longitude: number | null;
    description: string | null;
    approval_status: string;
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;

    images?: FavoriteImageResponse[];
}

export interface Favorite {
    id: number;
    user_id: number;
    car_id: number;
    created_at: string;
    updated_at: string;
    car: Car;
}

export interface FavoriteApiResponse {
    id: number;
    user_id: number;
    car_id: number;
    created_at: string;
    updated_at: string;
    car: FavoriteCarResponse;
}

export interface FavoritesResponse {
    message?: string;
    data?: FavoriteApiResponse[];
}

export interface AddFavoriteResponse {
    message: string;
    data: FavoriteApiResponse;
}

export interface FavoriteRequest {
    car_id: number;
}

export interface FavoriteMessageResponse {
    message: string;
}

export interface FavoriteToggleResult {
    carId: number;
    isFavorite: boolean;
    favorite?: Favorite;
}

export interface FavoritesState {
    items: Favorite[];
    favoriteIds: number[];
    loading: boolean;
    actionLoading: boolean;
    pendingIds: number[];
    error: string | null;
    initialized: boolean;
}