import { useState } from 'react'
import TabBar from './TabBar'
import TripCard from './TripCard'
import carImageSrc from "../../../assets/dashboardImages/carImage.webp"
import { MdDirectionsCar } from 'react-icons/md'
import type { Trip } from '../../../types/profile/profilePageTypes'
const trips : Trip[] = [
  {
    id: 1,
    carName: "Porsche 911 Carrera S",
    total: "$1,240.00",
    dates: "Oct 24 - Oct 27, 2024",
    location: "Beverly Hills Delivery",
    tags: ["Performance", "PDK Auto"],
    status: "upcoming",
    primaryAction: "Check-in",
    image: carImageSrc,
  },
  {
    id: 2,
    carName: "Tesla Model S Plaid",
    total: "$890.00",
    dates: "Nov 12 - Nov 14, 2024",
    location: "LAX Airport Pick-up",
    tags: ["Electric", "Autopilot"],
    status: "upcoming",
    primaryAction: "View Details",
    image: carImageSrc,
  },
]

export default function TripsSection() {
  const [activeTab, setActiveTab] = useState("Upcoming Trips")

  return (
    <div className="bg-surface rounded-2xl overflow-hidden flex flex-col w-full">

      {/* Tab Bar */}
      <div className="px-4 pt-4">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-4">

        {/* Upcoming Trips — mapped TripCards */}
        {activeTab === "Upcoming Trips" && (
          trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))
        )}

        {/* Empty State — Completed & Cancelled */}
        {activeTab !== "Upcoming Trips" && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <MdDirectionsCar className="text-5xl text-text-secondary opacity-40" />
            <p className="text-sm text-text-secondary">No trips yet</p>
          </div>
        )}

      </div>
    </div>
  )
}