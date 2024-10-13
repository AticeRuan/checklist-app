import { View, Text } from 'react-native'
import React from 'react'
import ChildrenLayout from '../../../components/ChildrenLayout'
import { Stack } from 'expo-router'

const ActionLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[actionId]" options={{ headerShown: false }} />
    </Stack>
  )
}

export default ActionLayout
