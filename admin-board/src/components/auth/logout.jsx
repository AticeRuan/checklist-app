import React from 'react'
import { LogoutIcon } from '../svg/logout'
import { useLogoutUserMutation } from '../../app/api/userApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../app/features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const [logoutUser] = useLogoutUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate('/login')
      localStorage.removeItem('token')
      dispatch(logout())
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }
  return (
    <button
      className="absolute top-0 right-0 flex gap-2 p-8 lg:mr-28 xl:mr-48 2xl:mr-80"
      onClick={handleLogout}
    >
      <p className="text-b-mid-blue capitalize font-bold text-lg">log out</p>
      <LogoutIcon />
    </button>
  )
}

export default Logout
