import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteNotification, fetchNotifications } from "./notificationsApi";
import { parseNotificationsError } from "./notificationsError";
import type {
    AppNotification,
    NotificationsState,
} from "./notificationsTypes";

const initialState: NotificationsState = {
    items: [],
    loading: false,
    deletingId: null,
    errorMessage: null,
};

export const fetchNotificationsThunk = createAsyncThunk<
    AppNotification[],
    void,
    { rejectValue: string }
>("notifications/fetchNotifications", async (_, thunkApi) => {
    try {
        return await fetchNotifications();
    } catch (error) {
        return thunkApi.rejectWithValue(parseNotificationsError(error));
    }
});

export const deleteNotificationThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("notifications/deleteNotification", async (notificationId, thunkApi) => {
    try {
        await deleteNotification(notificationId);
        return notificationId;
    } catch (error) {
        return thunkApi.rejectWithValue(parseNotificationsError(error));
    }
});

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        resetNotificationsState: (state) => {
            state.loading = false;
            state.deletingId = null;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationsThunk.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.errorMessage = null;
            })
            .addCase(fetchNotificationsThunk.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload ?? "Failed to load notifications.";
            })
            .addCase(deleteNotificationThunk.pending, (state, action) => {
                state.deletingId = action.meta.arg;
                state.errorMessage = null;
            })
            .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
                state.deletingId = null;
                state.items = state.items.filter(
                    (notification) => notification.id !== action.payload
                );
            })
            .addCase(deleteNotificationThunk.rejected, (state, action) => {
                state.deletingId = null;
                state.errorMessage = action.payload ?? "Failed to delete notification.";
            });
    },
});

export const { resetNotificationsState } = notificationsSlice.actions;
export default notificationsSlice.reducer;