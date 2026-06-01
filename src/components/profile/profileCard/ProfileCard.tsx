import AvatarWithBadge from "./AvatarWithBadge";
import StatsRow from "./StatsRow";
import MenuList from "./MenuList";
import type { Profile } from "../../../app/features/profile/profileTypes";
import type { ProfileView } from "../../../types/profile/profilePageTypes";

interface ProfileCardProps {
  profile: Profile | null;
  loading?: boolean;
  error?: string | null;
  activeView: ProfileView;
  onViewChange: (view: ProfileView) => void;
}

const getDisplayName = (profile: Profile | null): string => {
  if (!profile) return "Loading...";

  const fullName = profile.full_name?.trim();
  if (fullName) return fullName;

  const fallbackName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fallbackName || profile.user.name;
};

const getMemberSinceLabel = (profile: Profile | null): string => {
  if (!profile) return "Loading profile...";

  const sourceDate = profile.created_at || profile.user.created_at;
  if (!sourceDate) return "Premium Member";

  const year = new Date(sourceDate).getFullYear();
  return `Member since ${year}`;
};

const ProfileCardFile = ({
  profile,
  loading,
  error,
  activeView,
  onViewChange,
}: ProfileCardProps) => {
  const displayName = getDisplayName(profile);
  const memberSinceLabel = getMemberSinceLabel(profile);

  return (
    <div
      data-aos="fade-up"
      className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-5 w-full"
    >
      <AvatarWithBadge
        name={displayName}
        avatarUrl={profile?.avatar ?? null}
        loading={loading}
      />

      <div className="flex flex-col items-center gap-1 text-center">
        {loading ? (
          <div className="h-7 w-40 rounded bg-gray-200 animate-pulse" />
        ) : (
          <h2 className="text-xl font-bold text-text-primary">{displayName}</h2>
        )}

        {loading ? (
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
        ) : (
          <p className="text-sm text-text-secondary">{memberSinceLabel}</p>
        )}

        {loading ? (
          <div className="h-3 w-48 rounded bg-gray-200 animate-pulse" />
        ) : profile?.user.email ? (
          <p className="text-xs text-text-secondary/80">{profile.user.email}</p>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-500 text-center">{error}</p>
      ) : null}

      <StatsRow trips={5} rating={4.5} />

      <MenuList activeView={activeView} onViewChange={onViewChange} />
    </div>
  );
};

export default ProfileCardFile;
