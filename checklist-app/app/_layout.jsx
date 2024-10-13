import '../global.css'
import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SplashScreen, Slot } from 'expo-router'
import { Provider } from 'react-redux'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

// SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  })

  useEffect(() => {
    if (error) throw error

    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="camera" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  )
}

export default RootLayout
