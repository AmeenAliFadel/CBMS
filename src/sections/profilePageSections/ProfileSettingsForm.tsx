import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../app/features/profile/profileSlice";
import type { UpdateProfileRequest } from "../../app/features/profile/profileTypes";

import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../../schemas/profileSchemas";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiInfo,
  FiSettings,
} from "react-icons/fi";
interface ProfileSettingsFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

const toStringValue = (value?: string | null): string => value ?? "";

export default function ProfileSettingsForm({
  onCancel,
  onSuccess,
}: ProfileSettingsFormProps) {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      bio: "",
      address: "",
      country: "",
      city: "",
      gender: "",
      birth_date: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      first_name: toStringValue(profile.first_name),
      last_name: toStringValue(profile.last_name),
      bio: toStringValue(profile.bio),
      address: toStringValue(profile.address),
      country: toStringValue(profile.country),
      city: toStringValue(profile.city),
      gender: toStringValue(profile.gender),
      birth_date: toStringValue(profile.birth_date),
      phone: toStringValue(profile.phone),
    });
  }, [profile, reset]);

  const onSubmit = async (data: UpdateProfileFormValues) => {
    const payload: UpdateProfileRequest = {
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      bio: data.bio ?? "",
      address: data.address ?? "",
      country: data.country ?? "",
      city: data.city ?? "",
      gender: data.gender ?? "",
      birth_date: data.birth_date ?? "",
      phone: data.phone ?? "",
    };

    const result = await dispatch(updateProfile(payload));

    if (updateProfile.fulfilled.match(result)) {
      onSuccess?.();
    }
  };

  return (
    <>
      <div className="bg-surface rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-background flex items-center justify-center">
            <FiSettings className="text-primary text-lg" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Account Settings
            </h1>

            <p className="text-sm text-text-secondary mt-1">
              Manage your personal profile information.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface rounded-2xl p-6 flex flex-col gap-6"
      >
        <div>
          <h2 className="text-xl font-bold text-text-primary">Edit Profile</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Update your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiUser className="text-primary" />
              First Name
            </label>

            <input
              {...register("first_name")}
              placeholder="First Name"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.first_name && (
              <p className="text-red-500 text-xs">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiUser className="text-primary" />
              Last Name
            </label>

            <input
              {...register("last_name")}
              placeholder="Last Name"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiPhone className="text-primary" />
              Phone Number
            </label>

            <input
              {...register("phone")}
              placeholder="Phone Number"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiGlobe className="text-primary" />
              Country
            </label>

            <input
              {...register("country")}
              placeholder="Country"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiMapPin className="text-primary" />
              City
            </label>

            <input
              {...register("city")}
              placeholder="City"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiUser className="text-primary" />
              Gender
            </label>

            <input
              {...register("gender")}
              placeholder="Gender"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <FiCalendar className="text-primary" />
              Birth Date
            </label>

            <input
              {...register("birth_date")}
              type="date"
              className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
            />

            {errors.birth_date && (
              <p className="text-red-500 text-xs">
                {errors.birth_date.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <FiMapPin className="text-primary" />
            Address
          </label>

          <input
            {...register("address")}
            placeholder="Address"
            className="rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40"
          />

          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <FiInfo className="text-primary" />
            About You
          </label>

          <textarea
            {...register("bio")}
            placeholder="Tell us a little about yourself..."
            className="min-h-30 rounded-xl bg-background px-4 py-3 text-text-primary outline-none ring-1 ring-white/5 focus:ring-2 focus:ring-primary/40 resize-none"
          />

          {errors.bio && (
            <p className="text-red-500 text-xs">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-background text-text-primary hover:opacity-90 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}
