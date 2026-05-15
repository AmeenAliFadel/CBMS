import CarsSlider from '../../sections/HomePageSections/CarsSlider'
import HomePageHero from '../../sections/HomePageSections/HomePageHero'
import StepsJourneySection from '../../sections/HomePageSections/StepsJourneySection'

export default function HomePage() {
  return (
    <>
      <div className='px-4 sm:px-8 lg:px-20 ' >
        <HomePageHero />
        <CarsSlider />
        <StepsJourneySection />
      </div>

    </>
  )
}
