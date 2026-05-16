import React from 'react'
import FooterStrip from './FooterStrip'
import ProfileCardFile from './ProfileCardFile'
import LuxeRewardsCard from './LuxeRewardsCard'
import TripCardFile from './TripCardFile'
export default function ProfilePage() {
  return (
<main className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-background">
      <ProfileCardFile />
      <LuxeRewardsCard />
      <TripCardFile />
      <FooterStrip />
    </main>
  )
}
