import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitLessorRequest } from "./lessorRequestApi";
import { parseLessorRequestError } from "./lessorRequestError";
import type {
    LessorRequestApiResponse,
    LessorRequestFormValues,
    LessorRequestState,
} from "./lessorRequestTypes";

const initialState: LessorRequestState = {
    loading: false,
    successMessage: null,
    errorMessage: null,
    submittedRequest: null,
};

export const submitLessorRequestThunk = createAsyncThunk<
    LessorRequestApiResponse,
    LessorRequestFormValues,
    { rejectValue: string }
>("lessorRequest/submit", async (values, thunkApi) => {
    try {
        return await submitLessorRequest(values);
    } catch (error) {
        return thunkApi.rejectWithValue(parseLessorRequestError(error));
    }
});

const lessorRequestSlice = createSlice({
    name: "lessorRequest",
    initialState,
    reducers: {
        resetLessorRequestState: (state) => {
            state.loading = false;
            state.successMessage = null;
            state.errorMessage = null;
            state.submittedRequest = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitLessorRequestThunk.pending, (state) => {
                state.loading = true;
                state.successMessage = null;
                state.errorMessage = null;
            })
            .addCase(submitLessorRequestThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
                state.errorMessage = null;
                state.submittedRequest = action.payload.data;
            })
            .addCase(submitLessorRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.successMessage = null;
                state.errorMessage = action.payload ?? "Request failed.";
            });
    },
});

export const { resetLessorRequestState } = lessorRequestSlice.actions;
export default lessorRequestSlice.reducer;