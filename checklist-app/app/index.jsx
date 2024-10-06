import { View, Text } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetAllSitesQuery } from '../api/siteApi'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'
import CustomDropdown from '../components/CustomDropdown'
import LoadingState from '../components/LoadingState'
import { setSites } from '../store/features/siteSlice'
import { Redirect, useRouter } from 'expo-router'

const SelectSite = () => {
  const { data: sites, error, isLoading } = useGetAllSitesQuery()
  const dispatch = useDispatch()
  const historySite = useSelector((state) => state.site.sites)

  const [selectedSite, setSelectedSite] = useState(null)
  const [isRegionSelected, setIsRegionSelected] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const region = new Set(sites?.map((site) => site.region))
  //   const siteList = useMemo(() => {
  //     return sites?.filter((site) => site.region === selectedRegion)
  //   }, [selectedRegion])
  const [siteList, setSiteList] = useState([])

  useEffect(() => {
    console.log(historySite)
  }, [historySite])

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
      alert('Please select a site')
    } else {
      dispatch(setSites(selectedSite))
      router.push('/(tabs)/checklist/checklists')
    }
  }
  const router = useRouter()

  //   if (historySite !== null) return <Redirect to="/checklist/checklists" />
  //   else
  if (isLoading) {
    return (
      <SafeAreaView className=" h-full bg-transparent">
        <LoadingState />
      </SafeAreaView>
    )
  } else
    return (
      <SafeAreaView className=" h-full bg-transparent">
        <View className="items-center justify-center h-[80%] gap-[10px] ">
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
          <CustomButton text="Confirm" otherStyles="" OnPress={handleConfirm} />
        </View>
      </SafeAreaView>
    )
}

export default SelectSite
