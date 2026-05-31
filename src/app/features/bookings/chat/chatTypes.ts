export interface ChatSender {
    id: number;
    name: string;
}

export interface BookingMessage {
    id: number;
    booking_id: number;
    sender_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    sender: ChatSender;
}

export interface SendMessageRequest {
    message: string;
}

export interface ChatState {
    messages: BookingMessage[];
    loading: boolean;
    sending: boolean;
    error: string | null;
}