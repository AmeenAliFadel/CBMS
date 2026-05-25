import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSupportTicketRequest } from "./supportApi";
import { getSupportErrorMessage } from "./supportError";
import type {
    CreateSupportRequest,
    CreateSupportResponse,
    SupportState,
} from "./supportTypes";

const initialState: SupportState = {
    loading: false,
    error: null,
    successMessage: null,
    lastTicket: null,
};

export const submitSupportTicket = createAsyncThunk<
    CreateSupportResponse,
    CreateSupportRequest,
    { rejectValue: string }
>("support/submitSupportTicket", async (ticketData, { rejectWithValue }) => {
    try {
        return await createSupportTicketRequest(ticketData);
    } catch (error: unknown) {
        return rejectWithValue(
            getSupportErrorMessage(error, "Failed to send support ticket")
        );
    }
});

const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        clearSupportFeedback(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitSupportTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(submitSupportTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.successMessage = action.payload.message;
                state.lastTicket = action.payload.data;
            })
            .addCase(submitSupportTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
                state.successMessage = null;
            });
    },
});

export const { clearSupportFeedback } = supportSlice.actions;
export default supportSlice.reducer;