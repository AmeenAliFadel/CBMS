import { MdEdit } from 'react-icons/md'
import avatarSrc from "../../../assets/testimonials/avatar.png"

export default function AvatarWithBadge() {
  return (
    <div className="relative w-24 h-24">
      
      {/* Circular Avatar Image */}
      <img
        src={avatarSrc}
        alt="Profile Avatar"
        className="w-full h-full rounded-full object-cover"
      />

      {/* Edit Badge */}
      <div className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-white cursor-pointer">
        <MdEdit className="text-white text-sm" />
      </div>

    </div>
  )
}