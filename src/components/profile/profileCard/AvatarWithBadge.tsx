import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  uploadProfileAvatar,
  deleteProfileAvatar,
} from "../../../app/features/profile/profileSlice";

interface AvatarWithBadgeProps {
  name: string;
  avatarUrl?: string | null;
  loading?: boolean;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";

  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";

  return `${first}${second}`.toUpperCase();
};

export default function AvatarWithBadge({
  name,
  avatarUrl,
  loading = false,
}: AvatarWithBadgeProps) {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const avatarLoading = useAppSelector(
    (state) => state.profile.avatarLoading
  );

  const initials = getInitials(name);

  const handleUpload = (file?: File) => {
    if (!file) return;
    dispatch(uploadProfileAvatar(file));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProfileAvatar());
  };

  const isLoading = loading || avatarLoading;

  return (
    <div className="relative group w-fit">
      
      {/* hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={(e) => handleUpload(e.target.files?.[0])}
      />

      {/* avatar */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-24 w-24 rounded-full bg-background overflow-hidden flex items-center justify-center border border-white/10 cursor-pointer relative"
      >
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-white/5" />
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-text-primary">
            {initials}
          </span>
        )}

        {/* overlay */}
        <div className="
          absolute inset-0 
          bg-black/40 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-200 
          flex items-center justify-center 
          text-xs text-white
        ">
          Change
        </div>
      </div>

      {/* REMOVE button (smooth hover, no flicker) */}
      {avatarUrl && (
        <button
          onClick={handleDelete}
          className="
            absolute -bottom-2 -right-2 
            bg-red-500 text-white 
            text-[10px] px-2 py-1 
            rounded-full shadow-md

            opacity-0 scale-90
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-200
          "
        >
          Remove
        </button>
      )}

      {/* status dot */}
      <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-surface bg-green-500" />
    </div>
  );
}