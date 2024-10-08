import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingState = ({ text = 'Loading' }) => {
  return (
    <View
      className="
    flex-1 justify-center items-center bg-primary w-full h-full "
    >
      <ActivityIndicator size="large" color="#ffffff" />
      <Text className="text-white mt-5 font-psemibold uppercase">{text}</Text>
    </View>
  )
}

export default LoadingState
