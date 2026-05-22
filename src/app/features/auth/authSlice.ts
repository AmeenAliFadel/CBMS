import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getCurrentUserRequest,
    loginRequest,
    logoutRequest,
    registerRequest,
} from "./authApi";
import { getAuthErrorMessage } from "./authError";
import type {
    AuthState,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    RegisterRequest,
    RegisterResponse,
    User,
} from "./authTypes";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    roles: [],
    loading: false,
    error: null,
    isAuthenticated: false,
    initialized: false,
};

const clearAuthState = (state: AuthState) => {
    state.user = null;
    state.token = null;
    state.roles = [];
    state.loading = false;
    state.error = null;
    state.isAuthenticated = false;
    state.initialized = true;

    localStorage.removeItem("token");
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginRequest,
    { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        return await loginRequest(credentials);
    } catch (error: unknown) {
        return rejectWithValue(
            getAuthErrorMessage(error, "Login failed")
        );
    }
});

export const registerUser = createAsyncThunk<
    RegisterResponse,
    RegisterRequest,
    { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        return await registerRequest(userData);
    } catch (error: unknown) {
        return rejectWithValue(
            getAuthErrorMessage(error, "Registration failed")
        );
    }
});

export const fetchCurrentUser = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
    try {
        return await getCurrentUserRequest();
    } catch (error: unknown) {
        return rejectWithValue(
            getAuthErrorMessage(error, "Failed to load user")
        );
    }
});

export const logoutUser = createAsyncThunk<
    LogoutResponse,
    void,
    { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
        return await logoutRequest();
    } catch (error: unknown) {
        return rejectWithValue(
            getAuthErrorMessage(error, "Logout failed")
        );
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        markAuthInitialized(state) {
            state.initialized = true;
        },
        logout(state) {
            clearAuthState(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.initialized = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.roles = action.payload.role;
                state.error = null;

                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.initialized = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.roles = action.payload.role;
                state.error = null;

                localStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.initialized = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                clearAuthState(state);
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                clearAuthState(state);
            })
            .addCase(logoutUser.rejected, (state) => {
                clearAuthState(state);
            });
    },
});

export const { logout, markAuthInitialized } = authSlice.actions;
export default authSlice.reducer;