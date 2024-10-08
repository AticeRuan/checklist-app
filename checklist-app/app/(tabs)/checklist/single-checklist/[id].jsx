import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetOneChecklistQuery } from '../../../../api/checklistApi'
import { setSingleChecklist } from '../../../../store/features/checklistSlice'
import LoadingScreen from '../../../../components/LoadingScreen'

const SingleList = () => {
  const { id } = useGlobalSearchParams()
  const { data: checklist, error, isLoading } = useGetOneChecklistQuery(id)
  const dispatch = useDispatch()
  const [singleList, setSingleList] = useState(null)

  useEffect(() => {
    if (checklist) {
      // Dispatch the checklist to Redux store
      dispatch(setSingleChecklist(checklist))
      // Set local state with checklist data
      setSingleList(checklist)
    }
  }, [checklist, dispatch])

  useEffect(() => {
    console.log('checklist:', checklist)
    console.log('id:', id)
  }, [singleList])

  // Display loading state
  if (isLoading) {
    return <LoadingScreen />
  }

  // Display error state
  if (error) {
    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
        <Text className="text-white">Failed to load checklist.</Text>
      </SafeAreaView>
    )
  }

  // Render the checklist data
  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <View className="items-center justify-start bg-white w-screen mt-16 rounded-t-[48px] h-[98%] py-[40%]">
        <Text className="text-black">Machine ID: {singleList?.machine_id}</Text>
        <Text className="text-black">
          Checklist Title: {singleList?.template?.title}
        </Text>
        {/* Render other data as needed */}
      </View>
    </SafeAreaView>
  )
}

export default SingleList
