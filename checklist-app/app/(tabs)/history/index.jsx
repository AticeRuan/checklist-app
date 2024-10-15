import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../components/Header'
import StaffHistoryList from '../../../components/history/StaffHistoryList'
import useUserDetails from '../../../hooks/useUserDetails '
import SupervisorHistoryList from '../../../components/history/SupervisorHistoryList'
import useSiteDetails from '../../../hooks/useSiteDetails'
const History = () => {
  const { access_level } = useUserDetails()
  const { siteId } = useSiteDetails()

  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-full">
      <Header />
      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 py-[15px] px-[20px] min-h-full">
        <View className="mt-2 items-center justify-center w-full h-auto ">
          <Text className="text-3xl text-b-active-blue font-semibold  ">
            History
          </Text>
        </View>
        {access_level === 3 ? (
          <StaffHistoryList />
        ) : access_level === 2 ? (
          <SupervisorHistoryList />
        ) : null}
      </View>
    </SafeAreaView>
  )
}

export default History
