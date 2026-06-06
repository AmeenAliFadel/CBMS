import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSuitcase, FaCog, FaCheckCircle } from "react-icons/fa";
import type { ProfileView } from "../../../types/profile/profilePageTypes";

interface MenuListProps {
  activeView: ProfileView;
  onViewChange: (view: ProfileView) => void;
}

type MenuItem =
  | {
    label: string;
    view: ProfileView;
    icon: React.ElementType;
    route?: never;
  }
  | {
    label: string;
    route: string;
    icon: React.ElementType;
    view?: never;
  };

export default function MenuList({ activeView, onViewChange }: MenuListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    { label: "Profile", view: "profile", icon: FaUser },
    { label: "My bookings", view: "bookings", icon: FaSuitcase },
    { label: "Membership", route: "/membership", icon: FaCheckCircle },
    { label: "Account Settings", view: "account-settings", icon: FaCog },
  ];

  const handleClick = (item: MenuItem) => {
    if ("route" in item && item.route) {
      navigate(item.route);
      return;
    }

    if ("view" in item && item.view) {
      onViewChange(item.view);
    }
  };
  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item) => {
        const Icon = item.icon;

        const isActive =
          "view" in item
            ? activeView === item.view
            : location.pathname.startsWith(item.route);

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => handleClick(item)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition duration-200 ${isActive
              ? "bg-primary text-white shadow-soft"
              : "bg-background/50 text-text-secondary hover:bg-background"
              }`}
          >
            <Icon className="text-sm" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}