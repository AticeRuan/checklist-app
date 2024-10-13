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

const SingleAction = () => {
  const { actionId } = useGlobalSearchParams()
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
    if (access_level === 2 && action?.is_read === false) {
      readAction(actionId)
    }
  }, [access_level, actionId, readAction])

  if (getActionLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 py-[15px] px-[20px]  min-h-full">
        <View className="mt-5 flex-row items-center justify-start w-full ">
          <Pressable
            onPress={() => {
              router.replace('action')
            }}
            className="flex-2"
          >
            <Image source={icons.backIcon} resizeMode="contain" />
          </Pressable>

          <Text className="text-3xl text-b-active-blue font-semibold ml-[30%] flex-1">
            Action Detail
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
        >
          <SingleActionDetails action={action} access_level={access_level} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SingleAction
