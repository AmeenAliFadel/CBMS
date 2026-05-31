import { api } from "../../../../services/axios";

import type { BookingMessage, SendMessageRequest } from "./chatTypes";

export const chatApi = {
    getMessages: async (bookingId: string): Promise<BookingMessage[]> => {
        const res = await api.get(
            `/v1/bookings/${bookingId}/messages`
        );
        return res.data;
    },

    sendMessage: async (
        bookingId: string,
        data: SendMessageRequest
    ): Promise<BookingMessage> => {
        const res = await api.post(
            `/v1/bookings/${bookingId}/messages`,
            data
        );
        return res.data.data;
    },
};