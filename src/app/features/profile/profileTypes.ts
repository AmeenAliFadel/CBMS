export interface ProfileUser {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  bio: string | null;
  avatar: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  gender: string | null;
  birth_date: string | null;
  phone: string | null;
  user: ProfileUser;
  created_at: string;
  updated_at?: string | null;
}

export interface GetCurrentProfileResponse {
  profile: Profile;
}

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  updateSuccess: boolean;

  successMessage: string | null;

  avatarLoading: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  bio?: string | null;
  address?: string | null;
  country?: string | null;
  city?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  phone?: string | null;
}

export interface UpdateProfileResponse {
  profile: Profile;
}

export interface UpdateProfileResponse {
  profile: Profile;
}

export interface UploadAvatarResponse {
  message: string;
  avatar_url: string;
}

export interface DeleteAvatarResponse {
  message: string;
}