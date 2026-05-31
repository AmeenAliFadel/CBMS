import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ChatState, SendMessageRequest } from "./chatTypes";
import { chatApi } from "./chatApi";

const initialState: ChatState = {
    messages: [],
    loading: false,
    sending: false,
    error: null,
};

export const fetchMessages = createAsyncThunk(
    "chat/fetchMessages",
    async (bookingId: string) => {
        return await chatApi.getMessages(bookingId);
    }
);

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({
        bookingId,
        data,
    }: {
        bookingId: string;
        data: SendMessageRequest;
    }) => {
        return await chatApi.sendMessage(bookingId, data);
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearChat: (state) => {
            state.messages = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load messages";
            })
            .addCase(sendMessage.pending, (state) => {
                state.sending = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sending = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state) => {
                state.sending = false;
                state.error = "Failed to send message";
            });
    },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;