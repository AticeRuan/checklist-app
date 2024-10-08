import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../../components/Header'
import { useGlobalSearchParams } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import CustomButton from '../../../../components/CustomButton'

const SingleListItem = () => {
  const { id } = useGlobalSearchParams()
  const checklist = useSelector((state) => state.checklist.checklist)
  const userCheck = checklist?.user_checks.find(
    (check) => check.user_check_id == id,
  )
  useEffect(() => {
    console.log('userCheck:', userCheck)
  }, [])
  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />
      <View>
        <Text>{userCheck.list_item.keyword}</Text>
        <Text>{userCheck.list_item.description}</Text>
        <Text>Flags({userCheck.action?.length || 0})</Text>
        <CustomButton text="check" />
        <CustomButton
          text="Send Action"
          otherStyles="border-2 border-b-active-blue  text-black"
        />
      </View>
    </SafeAreaView>
  )
}

export default SingleListItem
