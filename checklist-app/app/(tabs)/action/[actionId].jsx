import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { useGlobalSearchParams, router } from 'expo-router'
import {
  useGetOneActionQuery,
  useReadActionMutation,
} from '../../../api/actionApi'

import icons from '../../../constants/icons'
import LoadingScreen from '../../../components/LoadingScreen'
import CustomButton from '../../../components/CustomButton'
import SingleActionDetails from '../../../components/action/SingleActionDetails'
import useUserDetails from '../../../hooks/useUserDetails '
import { setComments } from '../../../store/features/commentSlice'

const SingleAction = () => {
  const { actionId } = useGlobalSearchParams()
  const dispatch = useDispatch()
  //user details
  const { access_level } = useUserDetails()
  const [readAction, { isLoading: readActionLoading }] = useReadActionMutation()

  const {
    data: action,
    error,
    isLoading: getActionLoading,
    refetch,
  } = useGetOneActionQuery(actionId)

  useEffect(() => {
    const handleReadAction = async (id) => {
      try {
        await readAction(id)
      } catch (error) {
        console.error('Failed to read action:', error)
      }
    }

    if (access_level === 2 && action?.is_read === false && actionId) {
      handleReadAction(actionId)
    }
  }, [access_level, action?.is_read, actionId, readAction])

  useEffect(() => {
    if (action) {
      dispatch(setComments(action.comments))
    }
  }, [action])

  const comments = useSelector((state) => state.comment.comments)

  if (getActionLoading || readActionLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 py-[15px] px-[10px]  min-h-full">
        <View className="mt-5 flex-row items-center justify-start w-full ">
          <Pressable
            onPress={() => {
              router.replace('action')
            }}
            className="flex-2 ml-2"
          >
            <Image source={icons.backIcon} resizeMode="contain" />
          </Pressable>

          <Text className="text-3xl text-b-active-blue font-semibold ml-[26%] flex-1">
            Action Detail
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
        >
          <SingleActionDetails
            action={action}
            access_level={access_level}
            comments={comments}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SingleAction
