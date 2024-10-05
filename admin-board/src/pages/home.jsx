import Tile from '../components/ui/tile'
import TileGrounp from '../components/ui/tileGrounp'
import { useSelector, useDispatch } from 'react-redux'

import { useEffect, useState } from 'react'
//import hook from apiSlices
import { useGetAllCategoriesQuery } from '../app/api/categoryApi'
import { useGetAllSitesQuery } from '../app/api/siteApi'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import { useGetAllUsersQuery } from '../app/api/userApi'
import { useGetAllIpAddressesQuery } from '../app/api/ipAddress'
//import actions from slices
import { getTemplates } from '../app/features/template/templateSlice'
import { getCategories } from '../app/features/category/categorySlice'
import { getSites } from '../app/features/site/siteSlice'
import { getUsers } from '../app/features/user/userSlice'
import { getIpAddresses } from '../app/features/ipAddress/ipAddressSlice'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'
import { useLogoutUserMutation } from '../app/api/userApi'

const Home = () => {
  const user = useSelector((state) => state.auth.user)
  const name = user?.name || 'user'
  const isAdmin = user?.role === 'admin'
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [isDataError, setIsDataError] = useState(false)
  //fetch data on page load
  const {
    data: templates,
    error: templateError,
    isLoading: templateLoading,
  } = useGetAllTemplatesQuery(undefined, { skip: !user })
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetAllCategoriesQuery(undefined, { skip: !user })
  const {
    data: sites,
    error: sitesError,
    isLoading: sitesLoading,
  } = useGetAllSitesQuery(undefined, { skip: !user })
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useGetAllUsersQuery(undefined, { skip: !isAdmin })
  const {
    data: ipAddresses,
    error: ipAddressesError,
    isLoading: ipAddressesLoading,
  } = useGetAllIpAddressesQuery(undefined, { skip: !isAdmin })
  useEffect(() => {
    if (
      !templateLoading &&
      !categoriesLoading &&
      !sitesLoading &&
      !usersLoading &&
      !ipAddressesLoading
    ) {
      setIsDataLoading(false)
    }
  }, [
    isDataLoading,
    templateLoading,
    categoriesLoading,
    sitesLoading,
    usersLoading,
    ipAddressesLoading,
  ])
  useEffect(() => {
    if (
      templateError ||
      categoriesError ||
      sitesError ||
      usersError ||
      ipAddressesError
    ) {
      setIsDataError(true)
    }
  }, [
    isDataError,
    templateError,
    categoriesError,
    sitesError,
    usersError,
    ipAddressesError,
  ])
  const dispatch = useDispatch()
  useEffect(() => {
    if (templates) {
      dispatch(getTemplates(templates))
      // console.log('Fetched templates:', templates)
    }
  }, [templates, dispatch])
  useEffect(() => {
    if (categories) {
      dispatch(getCategories(categories))
    }
  }, [categories, dispatch])
  useEffect(() => {
    if (sites) {
      dispatch(getSites(sites))
    }
  }, [sites, dispatch])
  useEffect(() => {
    if (users) {
      dispatch(getUsers(users))
    }
  }, [users, dispatch])
  useEffect(() => {
    if (ipAddresses) {
      dispatch(getIpAddresses(ipAddresses))
    }
  }, [ipAddresses, dispatch])
  const localtemplates = useSelector((state) => state.template.templates || [])
  // useEffect(() => {
  //   console.log('localtemplates:', localtemplates)
  //   console.log('templates:', templates)
  // }, [localtemplates, templates])
  // useEffect(() => {
  //   console.log(
  //     'localtemplates:',
  //     localtemplates,
  //     'Type:',
  //     typeof localtemplates,
  //   )
  // }, [localtemplates])
  const tokenTodelete = localStorage.getItem('refreshToken')
  const activeTemplates = Array.isArray(localtemplates)
    ? localtemplates.filter((template) => template.status === 'published')
    : []
  const recentUpdatedTemplates = activeTemplates
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
  const recentCreatedTemplates = activeTemplates
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
  const draftTemplates = Array.isArray(localtemplates)
    ? localtemplates
        .filter((template) => template.status === 'draft')
        .slice(0, 5)
    : []
  if (isDataLoading) return <Loading />
  if (isDataError) return <Error />
  return (
    <>
      <div className="p-[3rem] flex flex-col items-start justify-start w-full mb-20">
        <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem] whitespace-nowrap capitalize">
          Welcome Back {name}!
        </h1>
        <div className=" flex items-center flex-col gap-16 justify-center w-full">
          <TileGrounp data={recentUpdatedTemplates} title="Recently Updated" />
          <TileGrounp data={recentCreatedTemplates} title="Recently Created" />
          <TileGrounp data={draftTemplates} title="Drafts" />
        </div>
      </div>
    </>
  )
}

export default Home
