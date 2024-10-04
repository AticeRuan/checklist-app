import '../global.css'
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SplashScreen } from 'expo-router'

// SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
