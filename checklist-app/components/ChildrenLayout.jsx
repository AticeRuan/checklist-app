import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import Header from './Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
const ChildrenLayout = () => {
  return (
    <View className="bg-b-mid-blue">
      <SafeAreaView className="h-full">
        <Header />
        <Slot />
        <StatusBar backgroundColor="#00AEEF" style="dark" />
      </SafeAreaView>
    </View>
  )
}

export default ChildrenLayout
