import { useEffect, useState } from "react";
import SuccessToast from "../../components/ui/toast/SuccessToast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCurrentProfile } from "../../app/features/profile/profileSlice";

import ProfileCardFile from "../../components/profile/profileCard/ProfileCard";
import GuestProfileCard from "../../components/profile/profileCard/GuestProfileCard";
import LuxeRewardsCard from "../../components/profile/luxeRewardsCard/LuxeRewardsCard";
import TripsSection from "../../components/profile/tripsSection/TripsSection";
import FooterStrip from "../../components/profile/footerStrip/FooterStrip";

import ProfileSettingsForm from "../../sections/profilePageSections/ProfileSettingsForm";
import ProfileSettingsSection from "../../sections/profilePageSections/ProfilePageSection";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const [activeView, setActiveView] = useState
    <"bookings" | "account-settings" | "profile"
  >("bookings");

  const [toast, setToast] = useState(false);

  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(fetchCurrentProfile());
  }, [dispatch, isAuthenticated]);

  const handleUpdateSuccess = () => {
    setToast(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row items-center px-4 py-8 gap-4">
      {/* TOAST */}
      <SuccessToast
        show={toast}
        message="Profile updated successfully"
        onClose={() => setToast(false)}
      />

      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full lg:w-80 lg:sticky lg:top-8 lg:self-start">
        {!isAuthenticated ? (
          <GuestProfileCard />
        ) : (
          <ProfileCardFile
            profile={profile}
            loading={loading}
            error={error}
            activeView={activeView}
            onViewChange={setActiveView}
          />
        )}
        <LuxeRewardsCard />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-4 flex-1 w-full">
        {activeView === "bookings" && <TripsSection />}

        {activeView === "profile" && <ProfileSettingsSection />}

        {activeView === "account-settings" && (
          <ProfileSettingsForm
            onCancel={() => setActiveView("profile")}
            onSuccess={handleUpdateSuccess}
          />
        )}

        <FooterStrip />
      </div>
    </div>
  );
}