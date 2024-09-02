import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

import Login from '../pages/login'
import { useSelector } from 'react-redux'
import Logout from '../components/auth/logout'
const RootLayout = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="w-screen min-h-screen flex overflow-x-hidden">
      {!user ? (
        <Login />
      ) : (
        <>
          <Logout />

          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  )
}

export default RootLayout
