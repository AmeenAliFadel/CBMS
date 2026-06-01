import { api } from "../../../services/axios";

import type {
    DeleteAvatarResponse,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadAvatarResponse,
} from "./profileTypes";

export async function getCurrentProfileRequest() {
  const response = await api.get<ProfileResponse>(
    "/v1/profiles"
  );

  return response.data.profile;
}

export async function updateProfileRequest(
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  const response = await api.put<UpdateProfileResponse>(
    "/v1/profiles",
    data
  );

  return response.data;
}

export async function uploadAvatarRequest(file: File): Promise<UploadAvatarResponse> {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post<UploadAvatarResponse>(
    "/v1/profiles/avatars",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function deleteAvatarRequest(): Promise<DeleteAvatarResponse> {
  const response = await api.delete<DeleteAvatarResponse>("/v1/profiles/avatars");
  return response.data;
}

