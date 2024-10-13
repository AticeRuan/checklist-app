import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { CameraView, useCameraPermissions, Camera } from 'expo-camera'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomPressable from '../components/CustomPressable'
import { StatusBar } from 'expo-status-bar'

const CameraScreen = () => {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
  const [photo, setPhoto] = useState(null)
  const [permission, requestPermission] = useCameraPermissions()

  const handleTakePhoto = async () => {
    let options = { quality: 1, base64: true, exif: false }
    let newPhoto = cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  }

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }
    return (
      <SafeAreaView className="flex-1 w-full items-center justify-center">
        <Image
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
          className="w-full flex-1 p-10"
          resizeMode="cover"
        />
      </SafeAreaView>
    )
  }

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 w-full items-center justify-center">
        <Text>Requesting permissions...</Text>
      </SafeAreaView>
    )
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 w-full items-center justify-center">
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    )
  }

  return (
    <CameraView
      className="flex-1 w-full items-center justify-end"
      facing="back"
      ref={cameraRef}
    >
      <Pressable
        className="mb-[15vh] w-fit h-fit rounded-full p-4 bg-b-mid-blue"
        onPress={handleTakePhoto}
      >
        <Text className="text-white text-xl font-psemibold">Take Photo</Text>
      </Pressable>
      <StatusBar style="light" />
    </CameraView>
  )
}

export default CameraScreen
