import ProfileCardFile from '../../components/profile/profileCard/ProfileCard'
import LuxeRewardsCard from '../../components/profile/luxeRewardsCard/LuxeRewardsCard'
import TripsSection from '../../components/profile/tripsSection/TripsSection'
import FooterStrip from '../../components/profile/footerStrip/FooterStrip'
export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row items-center px-4 py-8 gap-4">

<div className="flex flex-col gap-4 w-full lg:w-80 lg:sticky lg:top-8 lg:self-start">
      <ProfileCardFile />
      <LuxeRewardsCard />
</div>
<div className='flex flex-col gap-4 flex-1 w-full'>
      <TripsSection />
      <FooterStrip />

</div>
    </div>
  )
}
