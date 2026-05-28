export interface LessorRequestUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    is_active: number;
    created_at: string;
    updated_at: string;
}

export interface LessorRequestEntity {
    user_id: number;
    business_name: string;
    phone: string;
    message: string;
    identity_front_image: string;
    identity_back_image: string;
    updated_at: string;
    created_at: string;
    id: number;
    user: LessorRequestUser;
}

export interface LessorRequestApiResponse {
    message: string;
    data: LessorRequestEntity;
}

export interface LessorRequestState {
    loading: boolean;
    successMessage: string | null;
    errorMessage: string | null;
    submittedRequest: LessorRequestEntity | null;
}

export interface LessorRequestFormValues {
    business_name: string;
    phone: string;
    message: string;
    identity_front_image?: File;
    identity_back_image?: File;
}