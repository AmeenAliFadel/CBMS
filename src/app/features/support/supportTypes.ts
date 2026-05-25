export interface SupportTicket {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface CreateSupportRequest {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface CreateSupportResponse {
    success: boolean;
    message: string;
    data: SupportTicket;
}

export interface SupportState {
    loading: boolean;
    error: string | null;
    successMessage: string | null;
    lastTicket: SupportTicket | null;
}