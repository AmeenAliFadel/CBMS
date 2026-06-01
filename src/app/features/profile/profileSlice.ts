import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  deleteAvatarRequest,
  getCurrentProfileRequest,
  updateProfileRequest,
  uploadAvatarRequest,
} from "./profileApi";

import { getProfileErrorMessage } from "./profileError";

import type {
  DeleteAvatarResponse,
  Profile,
  ProfileState,
  UpdateProfileRequest,
  UploadAvatarResponse,
} from "./profileTypes";

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  initialized: false,
  updateSuccess: false,
  successMessage: null,
  avatarLoading: false,
};

export const fetchCurrentProfile = createAsyncThunk<
  Profile,
  void,
  { rejectValue: string }
>("profile/fetchCurrentProfile", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentProfileRequest();
  } catch (error: unknown) {
    return rejectWithValue(getProfileErrorMessage(error, "Failed to load profile"));
  }
});

export const updateProfile = createAsyncThunk<
  Profile,
  UpdateProfileRequest,
  { rejectValue: string }
>("profile/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const response = await updateProfileRequest(data);
    return response.profile;
  } catch (error: unknown) {
    return rejectWithValue(getProfileErrorMessage(error, "Failed to update profile"));
  }
});

export const uploadProfileAvatar = createAsyncThunk<
  UploadAvatarResponse,
  File,
  { rejectValue: string }
>("profile/uploadProfileAvatar", async (file, { rejectWithValue }) => {
  try {
    return await uploadAvatarRequest(file);
  } catch (error: unknown) {
    return rejectWithValue(getProfileErrorMessage(error, "Failed to upload avatar"));
  }
});

export const deleteProfileAvatar = createAsyncThunk<
  DeleteAvatarResponse,
  void,
  { rejectValue: string }
>("profile/deleteProfileAvatar", async (_, { rejectWithValue }) => {
  try {
    return await deleteAvatarRequest();
  } catch (error: unknown) {
    return rejectWithValue(getProfileErrorMessage(error, "Failed to delete avatar"));
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.initialized = false;
      state.updateSuccess = false;
      state.successMessage = null;
      state.avatarLoading = false;
    },
    clearProfileFeedback(state) {
      state.updateSuccess = false;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchCurrentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchCurrentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
        state.initialized = true;
      })

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
        state.successMessage = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        state.updateSuccess = true;
        state.successMessage = "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
        state.updateSuccess = false;
      })

      // Upload avatar
      .addCase(uploadProfileAvatar.pending, (state) => {
        state.avatarLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(uploadProfileAvatar.fulfilled, (state, action) => {
        state.avatarLoading = false;
        if (state.profile) {
          state.profile.avatar = action.payload.avatar_url;
        }
        state.successMessage = action.payload.message || "Avatar uploaded successfully";
      })
      .addCase(uploadProfileAvatar.rejected, (state, action) => {
        state.avatarLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // Delete avatar
      .addCase(deleteProfileAvatar.pending, (state) => {
        state.avatarLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteProfileAvatar.fulfilled, (state, action) => {
        state.avatarLoading = false;
        if (state.profile) {
          state.profile.avatar = null;
        }
        state.successMessage = action.payload.message || "Avatar removed successfully";
      })
      .addCase(deleteProfileAvatar.rejected, (state, action) => {
        state.avatarLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearProfileState, clearProfileFeedback } = profileSlice.actions;
export default profileSlice.reducer;