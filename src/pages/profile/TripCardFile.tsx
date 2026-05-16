import React from 'react'
import TabBar from './TripsSection/TabBar'
import TripCard from './TripsSection/TripCard'
import carImage from "../../assets/CarSliderImgs/BMW.png"
export interface Trip {
  id: string
  carName: string
  total: string
  dates: string
  location: string
  tags: string[]
  status: string
  primaryAction: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: string | any
}
// eslint-disable-next-line react-refresh/only-export-components
export const dummyTrips : Trip[] = [
  {
    id: "TRIP-001",
    carName: "Porsche 911 Turbo S",
    total: "$185.50",
    dates: "May 22 - May 25, 2026",
    location: "San Francisco, CA",
    tags: ["Electric", "Autopilot", "Premium"],
    status: "upcoming",
    primaryAction: "View Details",
    image: carImage
  }
]
const TripCardFile = () => {
  return (
<>
<TabBar />
<TripCard trip = {dummyTrips[0]}/>
</>
  )
}

export default TripCardFile
