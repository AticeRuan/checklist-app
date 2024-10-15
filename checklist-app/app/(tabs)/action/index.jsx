import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import {
  useGetAllActionsBySiteQuery,
  useGetActionByUserQuery,
  useGetActionByUserAndSiteQuery,
} from '../../../api/actionApi'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from '../../../components/SearchBox'
import LoadingScreen from '../../../components/LoadingScreen'
import SingleAction from '../../../components/action/SingleAction'
import useRefreshing from '../../../hooks/useRefreshing'
import StaffActionList from '../../../components/action/StaffActionList'
import SupervisorActionList from '../../../components/action/SupervisorActionList'
import useSiteDetails from '../../../hooks/useSiteDetails'
import useUserDetails from '../../../hooks/useUserDetails '

const ActionList = () => {
  const { siteId } = useSiteDetails()
  //user details

  const { username, access_level } = useUserDetails()

  const { refetch } = useGetActionByUserAndSiteQuery(username, {
    skip: access_level !== 3,
  })
  const { refetch: refetchAllAction } = useGetAllActionsBySiteQuery(siteId, {
    skip: access_level !== 2,
  })

  const [keyword, setKeyword] = useState('')
  const [localActions, setLocalActions] = useState(null)
  const [filteredActions, setFilteredActions] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleLoading = (isLoading) => {
    setLoading(isLoading)
  }

  const handleError = (hasError) => {
    setError(hasError)
  }

  useEffect(() => {
    if (keyword) {
      const filtered = localActions.filter((action) =>
        action.content.toLowerCase().includes(keyword.toLowerCase()),
      )
      setFilteredActions(filtered)
    } else {
      setFilteredActions(localActions)
    }
  }, [keyword])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    const handleRefetch = async () => {
      if (access_level === 3) {
        await refetch()
      } else {
        await refetchAllAction()
      }
    }

    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
        >
          <View className="w-full flex-1 items-center justify-center">
            <Text className="text-white">Failed to load Action</Text>
            <Button title="Try again" onPress={handleRefetch} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-full">
      <Header />
      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 py-[15px] px-[20px] min-h-full">
        <View className="mt-2 items-center justify-center w-full h-auto ">
          <Text className="text-3xl text-b-active-blue font-semibold  ">
            Action
          </Text>
        </View>
        {access_level === 3 ? (
          <StaffActionList
            username={username}
            onError={handleLoading}
            onLoading={handleLoading}
            site_id={siteId}
          />
        ) : access_level === 2 ? (
          <SupervisorActionList
            onError={handleError}
            onLoading={handleLoading}
          />
        ) : null}
      </View>
    </SafeAreaView>
  )
}

export default ActionList
