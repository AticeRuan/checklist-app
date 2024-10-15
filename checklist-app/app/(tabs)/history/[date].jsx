import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import Header from '../../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../../constants/icons'
import { setDateForHistoryTab } from '../../../lib/dateFormater'
import { router } from 'expo-router'
import SingleHistoryList from '../../../components/history/SingleHistoryList'

const ChecklistByDueDate = () => {
  const { date, checklists } = useGlobalSearchParams()
  let checklistsArray = []
  try {
    checklistsArray = checklists ? JSON.parse(checklists) : []
  } catch (error) {
    console.error('Failed to parse checklists:', error)
  }

  useEffect(() => {
    console.log(checklistsArray)
  }, [checklistsArray])

  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 py-[15px] px-[10px]  min-h-full">
        <View className="mt-5 flex-row items-center justify-start w-full ">
          <Pressable
            onPress={() => {
              router.replace('history')
            }}
            className="flex-2 ml-2"
          >
            <Image source={icons.backIcon} resizeMode="contain" />
          </Pressable>

          <Text className="text-3xl text-b-active-blue font-semibold ml-[26%] flex-1">
            {setDateForHistoryTab(date)}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
        >
          {checklistsArray.map((checklist) => (
            <SingleHistoryList checklist={checklist} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ChecklistByDueDate
