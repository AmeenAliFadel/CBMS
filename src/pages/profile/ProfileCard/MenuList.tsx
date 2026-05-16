import { useState } from 'react'
import { FaUser, FaCreditCard, FaShieldAlt, FaCog } from 'react-icons/fa'

const menuItems = [
  { id: 1, label: "Personal Information", icon: FaUser },
  { id: 2, label: "Payment Methods", icon: FaCreditCard },
  { id: 3, label: "Identity & Insurance", icon: FaShieldAlt },
  { id: 4, label: "Account Settings", icon: FaCog },
]

export default function MenuList() {
  const [activeMenu, setActiveMenu] = useState(1)

  return (
    <div className="flex flex-col gap-2 w-full">

      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = activeMenu === item.id

        return (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all cursor-pointer w-full
              ${isActive
                ? "bg-primary text-white"
                : "text-text-primary hover:bg-background"
              }`}
          >
            <Icon className="text-base" />
            {item.label}
          </button>
        )
      })}

    </div>
  )
}