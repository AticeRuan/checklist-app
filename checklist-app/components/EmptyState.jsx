import { View, Text } from 'react-native'
import React from 'react'

const EmptyState = ({ text = 'no data available' }) => {
  return (
    <View className="flex-1 w-[80vw] items-center justify-center">
      <Text className="text-xl capitalize text-b-mid-grey">{text}</Text>
    </View>
  )
}

export default EmptyState
