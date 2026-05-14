import CarsSlider from '../../sections/HomePageSections/CarsSlider'
import HomePageHero from '../../sections/HomePageSections/HomePageHero'

export default function HomePage() {
  return (
    <>
      <div className='px-4 sm:px-8 lg:px-20 ' >
        <HomePageHero />
        <CarsSlider />
      </div>

    </>
  )
}
