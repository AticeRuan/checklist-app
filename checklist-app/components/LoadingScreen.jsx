import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingState from './LoadingState'

const LoadingScreen = () => {
  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
      <LoadingState />
    </SafeAreaView>
  )
}

export default LoadingScreen
