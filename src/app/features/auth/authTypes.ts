export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
    email_verified_at?: string | null;
    is_active?: number;
    updated_at?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    role: string[];
    user: User;
}

export interface LogoutResponse {
    message: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    roles: string[];
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    initialized: boolean;
}