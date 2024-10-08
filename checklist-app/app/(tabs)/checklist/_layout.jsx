import React from 'react'
import ChildrenLayout from '../../../components/ChildrenLayout'
import { Tabs, Stack } from 'expo-router'

const ChecklistLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="enter-machine-number/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="single-checklist/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="single-listitem/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default ChecklistLayout
