import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { LogoutIcon } from '../components/svg/logout'
const RootLayout = () => {
  const user = null
  return (
    <div className="w-screen min-h-screen flex overflow-x-hidden">
      <button className="absolute top-0 right-0 flex gap-2 p-8 lg:mr-28 xl:mr-48 2xl:mr-80">
        <p className="text-b-mid-blue capitalize font-bold text-lg">log out</p>
        <LogoutIcon />
      </button>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout
