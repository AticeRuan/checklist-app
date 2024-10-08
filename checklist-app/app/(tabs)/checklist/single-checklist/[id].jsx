import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetOneChecklistQuery } from '../../../../api/checklistApi'
import {
  setSingleChecklist,
  updateSingleChecklist,
} from '../../../../store/features/checklistSlice'
import LoadingScreen from '../../../../components/LoadingScreen'
import SingleItem from '../../../../components/checklist/SingleItem'
import { useUpdateCheckMutation } from '../../../../api/userCheckApi'
import Header from '../../../../components/Header'

const SingleList = () => {
  const { id } = useGlobalSearchParams()
  const testingID = 61
  const {
    data: checklist,
    error,
    isLoading,
  } = useGetOneChecklistQuery(testingID)
  const dispatch = useDispatch()
  const [localLoding, setLocalLoading] = useState(true)
  const localChecklist = useSelector((state) => state.checklist.checklist)

  const [updateCheck, { isLoading: updateCheckLoading, isSuccess }] =
    useUpdateCheckMutation()

  useEffect(() => {
    if (checklist) {
      dispatch(setSingleChecklist(checklist))
      setLocalLoading(false)
    }
  }, [checklist, dispatch])

  const handleCheckChange = async (userCheckId, newValue) => {
    try {
      const payload = {
        id: userCheckId,
        is_checked: newValue,
        checklist_id: localChecklist.checklist_id,
      }

      const udpatedChecklist = await updateCheck(payload).unwrap()
      if (isSuccess) {
        console.log('udpatedChecklist:', udpatedChecklist.checklist)
        dispatch(updateSingleChecklist(udpatedChecklist.checklist))
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  // useEffect(() => {
  //   console.log('localChecklist:', localChecklist)
  //   console.log('id:', id)
  // }, [localChecklist])

  // Display loading state
  if (isLoading || updateCheckLoading || localLoding) {
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
    <SafeAreaView className="h-screen bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 px-[20px] p-[30px]">
        <Text className="text-2xl font-pbold text-b-active-blue">
          {localChecklist?.template?.title}
        </Text>
        {localChecklist?.machine_id && (
          <Text className="text-lg text-b-light-grey">
            Machine#:{localChecklist?.machine_id}
          </Text>
        )}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
        >
          <View className="mt-5">
            {localChecklist?.user_checks?.map((check) => (
              <SingleItem
                keyword={check.list_item.keyword}
                key={check.user_check_id}
                isChecked={check.is_checked}
                hasAction={check.has_action}
                actionCompleted={check.action?.isCompleted}
                onCheckChange={(newValue) => {
                  handleCheckChange(check.user_check_id, newValue)
                  console.log('newValue:', newValue)
                }}
                id={check.user_check_id}
                item={localChecklist}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SingleList
