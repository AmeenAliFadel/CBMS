import { useAppSelector } from "../../app/hooks";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHome,
  FiGlobe,
  FiCalendar,
  FiInfo,
} from "react-icons/fi";

type InfoFieldProps = {
  label: string;
  value?: string | null;
  icon: React.ReactNode;
};

function InfoField({
  label,
  value,
  icon,
}: InfoFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-secondary">
        {icon}
        {label}
      </span>

      <div className="rounded-xl bg-background px-4 py-3 min-h-13 flex items-center">
        <span className="text-sm font-medium text-text-primary">
          {value?.trim() || "Not provided"}
        </span>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-2xl p-6">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span className="text-primary text-lg">
            {icon}
          </span>

          <h2 className="text-lg font-semibold text-text-primary">
            {title}
          </h2>
        </div>

        <p className="text-sm text-text-secondary mt-1">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

export default function ProfileSettingsSection() {
  const profile = useAppSelector(
    (state) => state.profile.profile
  );

  const loading = useAppSelector(
    (state) => state.profile.loading
  );

  if (loading && !profile) {
    return (
      <div
        data-aos="fade-up"
        className="bg-surface rounded-2xl p-6"
      >
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-6 w-48 rounded bg-background" />
          <div className="h-4 w-72 rounded bg-background" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-14 rounded-xl bg-background"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        data-aos="fade-up"
        className="bg-surface rounded-2xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
            <FiUser className="text-xl text-text-secondary" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-text-primary">
          Profile unavailable
        </h2>

        <p className="text-sm text-text-secondary mt-2">
          Unable to load profile information.
        </p>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col gap-4 w-full"
    >
      {/* Personal Information */}

      <SectionCard
        title="Personal Information"
        description="Basic account details."
        icon={<FiUser />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField
            label="First Name"
            value={profile.first_name}
            icon={<FiUser size={14} />}
          />

          <InfoField
            label="Last Name"
            value={profile.last_name}
            icon={<FiUser size={14} />}
          />

          <InfoField
            label="Email"
            value={profile.user.email}
            icon={<FiMail size={14} />}
          />

          <InfoField
            label="Phone"
            value={profile.phone}
            icon={<FiPhone size={14} />}
          />
        </div>
      </SectionCard>

      {/* Location */}

      <SectionCard
        title="Location Information"
        description="Your location and address details."
        icon={<FiMapPin />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField
            label="Country"
            value={profile.country}
            icon={<FiGlobe size={14} />}
          />

          <InfoField
            label="City"
            value={profile.city}
            icon={<FiMapPin size={14} />}
          />

          <div className="md:col-span-2">
            <InfoField
              label="Address"
              value={profile.address}
              icon={<FiHome size={14} />}
            />
          </div>
        </div>
      </SectionCard>

      {/* Additional Information */}

      <SectionCard
        title="Additional Information"
        description="Extra profile information."
        icon={<FiInfo />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField
            label="Gender"
            value={profile.gender}
            icon={<FiUser size={14} />}
          />

          <InfoField
            label="Birth Date"
            value={profile.birth_date}
            icon={<FiCalendar size={14} />}
          />

          <div className="md:col-span-2">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-text-secondary">
                <FiInfo size={14} />
                Bio
              </span>

              <div className="rounded-xl bg-background p-4 min-h-30">
                <p className="text-sm text-text-primary leading-relaxed">
                  {profile.bio?.trim() ||
                    "No bio has been added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}