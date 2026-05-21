import { api } from "../../../services/axios";
import type {
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    User,
} from "./authTypes";

export const loginRequest = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/v1/login", data);
    return response.data;
};

export const getCurrentUserRequest = async (): Promise<User> => {
    const response = await api.get<User>("/v1/user");
    return response.data;
};

export const logoutRequest = async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>("/v1/logout");
    return response.data;
};