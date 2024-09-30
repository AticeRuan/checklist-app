import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useEffect } from 'react'
import Login from '../pages/login'
import { useSelector, useDispatch } from 'react-redux'
import Logout from '../components/auth/logout'
import { logout } from '../app/features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const RootLayout = () => {
  const user = useSelector((state) => state.auth.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      localStorage.removeItem('token')
      dispatch(logout())
    }
  }, [navigate, user, dispatch])

  // const { data: templates, isLoading: templateLoading } =
  //   useGetAllTemplatesQuery()

  // const { data: categories, isLoading: categoryLoading } =
  //   useGetAllCategoriesQuery()
  // const { data: sites, isLoading: siteLoading } = useGetAllSitesQuery()

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (templates) {
  //     dispatch(getCategories(templates))
  //   }
  //   if (categories) {
  //     dispatch(getTemplates(categories))
  //   }
  //   if (sites) {
  //     dispatch(getSites(sites))
  //   }
  // }, [templates, categories, sites, dispatch])

  // const isloading = templateLoading || categoryLoading || siteLoading

  return (
    <div className="w-screen min-h-screen flex overflow-x-hidden bg-gray-100">
      <Logout /> <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout
