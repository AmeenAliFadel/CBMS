import { MdHistory } from 'react-icons/md'

export default function FooterStrip() {
  return (
    <div className="bg-gray-100 rounded-2xl px-6 py-8 flex flex-col items-center justify-center gap-3">
      
      {/* History Icon */}
      <MdHistory className="text-3xl text-text-secondary" />

      {/* Text + Link */}
      <p className="text-sm text-text-secondary text-center">
        Looking for older trips?{" "}
        <a href="#" className="font-semibold text-primary hover:text-primary-dark transition-colors">
          View booking history
        </a>
      </p>

    </div>
  )
}