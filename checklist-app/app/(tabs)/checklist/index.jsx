import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Checklists = () => {
  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px] py-[40%]  min-h-full">
          <Text>Checklists</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Checklists
