// Types for your components
export interface UserProfile {
  name: string;
  subtitle: string;
  avatar: string;
  tripsCount: number;
  rating: number;
}

export interface Rewards {
  currentPoints: number;
  maxPoints: number;
  helperText: string;
}

export interface Trip {
  id: string;
  carName: string;
  totalPrice: number;
  dates: string;
  location: string;
  tags: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  buttonLabels: string[];
  carImage: string;
}

// ==========================================
// MOCK DATA
// ==========================================

export const mockUserProfile: UserProfile = {
  name: "Alex Mercer",
  subtitle: "Premium Member since 2025",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80", // High-quality Unsplash avatar
  tripsCount: 24,
  rating: 4.9
};

export const mockRewards: Rewards = {
  currentPoints: 7400,
  maxPoints: 10000,
  helperText: "You are 2,600 points away from unlocking a complimentary weekend with the Porsche 911 GT3 RS."
};

export const mockTrips: Trip[] = [
  {
    id: "TRIP-001",
    carName: "Porsche 911 Turbo S",
    totalPrice: 1250,
    dates: "May 22 - May 25, 2026",
    location: "Beverly Hills, CA",
    tags: ["Performance", "Sports"],
    status: "upcoming",
    buttonLabels: ["View Booking", "Modify Details"],
    carImage: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRIP-002",
    carName: "Range Rover Autobiography",
    totalPrice: 850,
    dates: "May 10 - May 13, 2026",
    location: "Malibu, CA",
    tags: ["Luxury SUV", "Chauffeur Optional"],
    status: "active",
    buttonLabels: ["Track Vehicle", "Contact Support"],
    carImage: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRIP-003",
    carName: "Audi e-tron GT",
    totalPrice: 980,
    dates: "April 14 - April 17, 2026",
    location: "San Francisco, CA",
    tags: ["Electric", "Supercharged"],
    status: "completed",
    buttonLabels: ["Rent Again", "Download Invoice"],
    carImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80"
  }
];