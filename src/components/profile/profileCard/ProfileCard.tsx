import React from 'react'
import AvatarWithBadge from './AvatarWithBadge'
import StatsRow from './StatsRow'
import MenuList from './MenuList'
const ProfileCardFile = () => {
  return (
<div className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-5 w-full">
<AvatarWithBadge />
<div className="flex flex-col items-center gap-1">
  <h2 className="text-xl font-bold text-text-primary">Alex Mercer</h2>
  <p className="text-sm text-text-secondary">Premium Member since 2025</p>
</div>
<StatsRow trips={5} rating={4.5} />
<MenuList />
</div>
  )
}

export default ProfileCardFile