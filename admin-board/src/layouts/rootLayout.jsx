import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useEffect } from 'react'
import Login from '../pages/login'
import { useSelector } from 'react-redux'
import Logout from '../components/auth/logout'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const RootLayout = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      localStorage.removeItem('token')
    }

    // if (user && pathname === '/login') {
    //   navigate('/')
    // }
  }, [user, navigate, pathname])

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
    <div className="w-screen min-h-screen flex overflow-x-hidden">
      {user && (
        <>
          <Logout /> <Navbar />
        </>
      )}

      <Outlet />
    </div>
  )
}

export default RootLayout
