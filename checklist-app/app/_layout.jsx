import '../global.css'
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SplashScreen } from 'expo-router'
import { Provider } from 'react-redux'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'

// SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  )
}

export default RootLayout
