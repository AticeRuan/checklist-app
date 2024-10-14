import { View, Text, Image } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetAllSitesQuery } from '../api/siteApi'
// import { useGetAllSitesQuery } from '../api/testingApi'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'
import CustomDropdown from '../components/CustomDropdown'
import { setSites, setSingleSite } from '../store/features/siteSlice'
import { Redirect, useRouter } from 'expo-router'
import { setUser, setUsers } from '../store/features/userSlice'
import LoadingScreen from '../components/LoadingScreen'

const users = [
  { username: 'Shannon', access_level: 3, name: 'Staff' },
  { username: 'Dan', access_level: 2, name: 'Supervisor' },
  { username: 'Michael', access_level: 1, name: 'Manager' },
]

const SelectSite = () => {
  const { data: sites, error, isLoading } = useGetAllSitesQuery()
  const dispatch = useDispatch()
  const historySite = useSelector((state) => state.site.singleSite)
  const localSites = useSelector((state) => state.site.sites)

  const [selectedSite, setSelectedSite] = useState(null)
  const [isRegionSelected, setIsRegionSelected] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const region = new Set(sites?.map((site) => site.region))

  const [siteList, setSiteList] = useState([])

  useEffect(() => {
    if (sites) {
      dispatch(setSites(sites))
    }
  }, [sites])

  // useEffect(() => {
  //   console.log('sites:', localSites)
  // }, [localSites])

  useEffect(() => {
    setSiteList(sites?.filter((site) => site.region === selectedRegion))
  }, [selectedRegion])

  const handleRegionSelect = (region) => {
    setIsRegionSelected(false)
    setSelectedSite(null)
    setSelectedRegion(region)

    setIsRegionSelected(true)
  }

  const handleSiteSelect = (site) => {
    setSelectedSite(site)
  }

  const handleConfirm = () => {
    if (selectedSite === null) {
      alert('Please select a site and a user')
    } else {
      dispatch(setSingleSite(selectedSite))
      //   dispatch(setUser(seletedUser))
      //   dispatch(setUsers(users))
      router.push('/checklist')
    }
  }

  //   testing only
  const [seletedUser, setSelectedUser] = useState(null)
  const handleUserSelect = (user) => {
    setSelectedUser(user)
    dispatch(setUser(user))
    dispatch(setUsers(users))
  }

  const router = useRouter()

  if (historySite !== null) {
    return <Redirect href="/checklist" />
  } else if (isLoading) {
    return <LoadingScreen />
  } else
    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
        <View className="items-center justify-start  bg-white w-screen mt-16 rounded-t-[48px] h-[98%] py-[40%]">
          <Text className="text-gray-700 capitalize font-psemibold text-[30px] mb-[20px]">
            Selecting Your Site
          </Text>
          <CustomDropdown
            label="Select Region"
            otherContainerStyles="mb-[20px]"
            otherListStyles=""
            data={Array.from(region)}
            text={
              selectedRegion === null
                ? 'click to select region'
                : selectedRegion
            }
            onSelect={handleRegionSelect}
          />
          {isRegionSelected && (
            <CustomDropdown
              label="Select Site"
              otherContainerStyles="mb-[20px]"
              otherListStyles=""
              data={siteList?.map((site) => site.site_name)}
              text={
                selectedSite === null ? 'click to select site' : selectedSite
              }
              onSelect={handleSiteSelect}
            />
          )}
          <CustomDropdown
            label="Testing: Select User"
            otherContainerStyles="mb-[20px]"
            otherListStyles=""
            data={users.map((user) => user.name)}
            text={seletedUser === null ? 'click to select user' : seletedUser}
            onSelect={handleUserSelect}
          />
          <CustomButton
            text="Confirm"
            otherStyles="bg-b-mid-blue"
            OnPress={handleConfirm}
          />
        </View>
      </SafeAreaView>
    )
}

export default SelectSite
