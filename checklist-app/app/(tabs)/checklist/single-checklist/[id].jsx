import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useGlobalSearchParams, useFocusEffect } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetOneChecklistQuery } from '../../../../api/checklistApi'
import { useUpdateCheckMutation } from '../../../../api/userCheckApi'
import {
  setSingleChecklist,
  updateSingleChecklist,
} from '../../../../store/features/checklistSlice'
import LoadingScreen from '../../../../components/LoadingScreen'
import SingleItem from '../../../../components/checklist/SingleItem'
import Header from '../../../../components/Header'
import useRefreshing from '../../../../hooks/useRefreshing'

const SingleList = () => {
  const { id } = useGlobalSearchParams()
  const {
    data: checklist,
    error,
    isLoading,
    refetch,
  } = useGetOneChecklistQuery(id)
  const dispatch = useDispatch()
  const [localLoding, setLocalLoading] = useState(true)
  const localChecklist = useSelector((state) => state.checklist.checklist)
  const [checklistToRender, setChecklistToRender] = useState(null)
  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()

  const onRefresh = async () => {
    triggerRefresh()
    await refetch()
    stopRefresh()
  }

  useFocusEffect(
    useCallback(() => {
      const fetchChecklist = async () => {
        await refetch()
      }

      fetchChecklist()
    }, []),
  )

  const [updateCheck, { isLoading: updateCheckLoading, isSuccess }] =
    useUpdateCheckMutation()

  useEffect(() => {
    if (checklist) {
      dispatch(setSingleChecklist(checklist))
      setLocalLoading(false)
    }
  }, [checklist, dispatch])

  useEffect(() => {
    if (localChecklist) {
      setChecklistToRender(localChecklist)
    }
  }, [localChecklist])

  const handleCheckChange = async (userCheckId, newValue) => {
    try {
      const payload = {
        id: userCheckId,
        is_checked: newValue,
        checklist_id: localChecklist.checklist_id,
      }

      const udpatedChecklist = await updateCheck(payload).unwrap()
      if (isSuccess) {
        dispatch(updateSingleChecklist(udpatedChecklist.checklist))
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  // useEffect(() => {
  //   console.log(
  //     'checklistToRender',
  //     checklistToRender.template.is_environment_related,
  //   )
  //   // console.log('id:', id)
  //   // console.log('checklist:', checklist)
  // }, [checklistToRender])

  // Display loading state
  if (isLoading || updateCheckLoading || localLoding) {
    return <LoadingScreen />
  }

  // Display error state
  if (error) {
    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className="text-white">Failed to load checklist.</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // Render the checklist data
  return (
    <SafeAreaView className="h-screen bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 px-[10px] p-[30px] min-h-full">
        <Text className="text-2xl font-bold text-b-active-blue">
          {checklistToRender?.template?.title}
        </Text>
        {checklistToRender?.machine_id && (
          <Text className="text-lg text-b-light-grey">
            Machine#:{checklistToRender?.machine_id}
          </Text>
        )}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="mt-5">
            {[...(checklistToRender?.user_checks || [])] // Create a copy of the user_checks array
              .sort((a, b) => a.is_checked - b.is_checked) // Sort by is_checked (false before true)
              .map((check) => (
                <SingleItem
                  keyword={check.list_item.keyword}
                  key={check.user_check_id}
                  isChecked={check.is_checked}
                  hasAction={check.action !== null}
                  actionCompleted={check.action?.isCompleted}
                  onCheckChange={(newValue) => {
                    handleCheckChange(check.user_check_id, newValue)
                  }}
                  id={check.user_check_id}
                  checklist_id={checklistToRender.checklist_id}
                  isEnv={checklistToRender.template.is_environment_related}
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SingleList
