
import CarPhotosSection from '../../sections/CarDetailsSections/CarPhotosSection'
import ContentCarSection from '../../sections/CarDetailsSections/ContentCarSection'
import { ReviewsSection } from '../../sections/CarDetailsSections/ReviewsSection'

export default function CarDetailsPage() {
  return (
    <div>
      <CarPhotosSection/>
      <ContentCarSection/>

      <ReviewsSection/>
    </div>
  )
}
