export interface ReviewUser {
    id: number;
    name: string;
}

export interface ReviewCar {
    id: number;
    title: string;
}

export interface Review {
    id: number;
    car_id: number;
    rating: number;
    comment: string;
    status?: string;
    created_at: string;
    updated_at?: string;
    user: ReviewUser;
    car?: ReviewCar;
}

export interface ReviewsResponse {
    reviews: Review[];
}

export interface CreateReviewRequest {
    rating: number;
    comment: string;
}

export interface CreateReviewResponse {
    message: string;
    review: Review;
}

export interface ReviewsState {
    items: Review[];
    loading: boolean;
    error: string | null;
    submitting: boolean;
    submitError: string | null;
    submitMessage: string | null;
}