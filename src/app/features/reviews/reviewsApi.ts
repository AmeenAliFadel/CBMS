import { api } from "../../../services/axios";
import type {
    CreateReviewRequest,
    CreateReviewResponse,
    ReviewsResponse,
} from "./reviewsTypes";

export async function getCarReviews(carId: number): Promise<ReviewsResponse> {
    const response = await api.get<ReviewsResponse>(`/v1/cars/${carId}/reviews`);
    return response.data;
}

export async function createCarReview(
    carId: number,
    payload: CreateReviewRequest
): Promise<CreateReviewResponse> {
    const response = await api.post<CreateReviewResponse>(`/v1/cars/${carId}/reviews`, payload);
    return response.data;
}