import { MdDateRange, MdLocationOn } from 'react-icons/md'

import type { Trip } from '../../../types/profile/profilePageTypes'
export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden flex flex-col md:flex-row w-full border border-border">

      {/* Car Image + UPCOMING Badge */}
      <div className="relative w-full h-44 md:w-44 md:h-auto md:shrink-0">
        <img
          src={trip.image}
          alt={trip.carName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* UPCOMING Badge */}
        <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          UPCOMING
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Car Name + Total */}
        <div className="flex items-start justify-between">
          <span className="text-base font-bold text-text-primary">{trip.carName}</span>
          <div className="flex flex-col items-end">
            <span className="text-xs text-text-secondary">Total</span>
            <span className="text-base font-bold text-primary">{trip.total}</span>
          </div>
        </div>

        {/* Date Row */}
        <div className="flex items-center gap-2 text-text-secondary md:gap-4">
          <MdDateRange className="text-base shrink-0" />
          <span className="text-sm">{trip.dates}</span>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-2 text-text-secondary md:gap-4">
          <MdLocationOn className="text-base shrink-0" />
          <span className="text-sm">{trip.location}</span>
        </div>

        {/* Feature Tags */}
        <div className="flex gap-2">
          {trip.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-text-secondary border border-border rounded-lg px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between md:justify-end gap-3 mt-1">
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold text-text-primary border border-border hover:bg-background transition-colors cursor-pointer">
            Manage Booking
          </button>
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer">
            {trip.primaryAction}
          </button>
        </div>

      </div>
    </div>
  )
}