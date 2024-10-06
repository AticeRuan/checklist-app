import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingState = ({ text = 'Loading' }) => {
  return (
    <View
      className="
    flex-1 justify-center items-center bg-primary w-full h-full "
    >
      <ActivityIndicator size="large" color="#ffffff" />
      <Text className="text-b-deep-blue mt-5">{text}</Text>
    </View>
  )
}

export default LoadingState
