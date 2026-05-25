import { api } from "../../../services/axios";
import type {
    CreateSupportRequest,
    CreateSupportResponse,
} from "./supportTypes";

export const createSupportTicketRequest = async (
    data: CreateSupportRequest
): Promise<CreateSupportResponse> => {
    const response = await api.post<CreateSupportResponse>("/v1/support", data);
    return response.data;
};