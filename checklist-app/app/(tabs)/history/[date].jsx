import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'

const ChecklistByDueDate = () => {
  const { date } = useGlobalSearchParams()
  return (
    <View>
      <Text>{date}</Text>
    </View>
  )
}

export default ChecklistByDueDate
