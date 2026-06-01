import { FaUser, FaSuitcase, FaCog } from "react-icons/fa";
import type { ProfileView } from "../../../types/profile/profilePageTypes";

interface MenuListProps {
  activeView: ProfileView;
  onViewChange: (view: ProfileView) => void;
}

export default function MenuList({
  activeView,
  onViewChange,
}: MenuListProps) {
  const items: {
    label: string;
    view: ProfileView;
    icon: React.ElementType;
  }[] = [
    {
      label: "Profile",
      view: "profile",
      icon: FaUser,
    },
    {
      label: "My bookings",
      view: "bookings",
      icon: FaSuitcase,
    },
    {
      label: "Account Settings",
      view: "account-settings",
      icon: FaCog,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive = activeView === item.view;

        return (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              isActive
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-background"
            }`}
          >
            <Icon className="text-sm" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}