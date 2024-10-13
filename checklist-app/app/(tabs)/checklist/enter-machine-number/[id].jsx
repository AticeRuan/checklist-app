import { View, Text, Pressable, Keyboard, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { usePathname, useGlobalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../../components/CustomButton'
import Inputfiled from '../../../../components/InputFiled'
import { router } from 'expo-router'
import { useUpdateMachineIdMutation } from '../../../../api/checklistApi'
import { useDispatch } from 'react-redux'
import { updateChecklist } from '../../../../store/features/checklistSlice'
import LoadingState from '../../../../components/LoadingState'
import LoadingScreen from '../../../../components/LoadingScreen'
import Header from '../../../../components/Header'

const EnterMachineNumber = () => {
  const { id } = useGlobalSearchParams()

  const dispatch = useDispatch()

  const [updateMachineId, { error, isLoading, isSuccess }] =
    useUpdateMachineIdMutation()

  const handleCancel = () => {
    Keyboard.dismiss()
    router.back()
  }
  const handleStart = async () => {
    try {
      if (machineNumber === '') {
        alert('Please enter a machine number')
        return
      }
      const payload = { id: id, machine_id: machineNumber }

      const updatedChecklists = await updateMachineId(payload).unwrap()

      if (updatedChecklists && updatedChecklists.machine_id) {
        dispatch(updateChecklist(updatedChecklists))
        router.replace(`/checklist/single-checklist/${id}`)
      } else {
        alert('Failed to add machine number')
        return
      }
    } catch (error) {
      console.error('Failed to add machine number:', error)
    } finally {
      setMachineNumber('')
    }
  }

  const [machineNumber, setMachineNumber] = useState('')

  const handleTextChange = (e) => {
    setMachineNumber(e)
  }

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <SafeAreaView className=" bg-b-mid-blue w-screen items-center justify-start h-screen ">
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="items-center   bg-white w-screen  rounded-t-[48px]   min-h-screen px-[20px] pt-[30%] "
          onPress={Keyboard.dismiss}
        >
          <View className="mb-3">
            <Inputfiled
              label="Enter Machine Number"
              value={machineNumber}
              handleChangeText={handleTextChange}
            />
          </View>
          <View className="mb-3">
            <CustomButton
              otherStyles="bg-b-mid-blue"
              text="start"
              OnPress={handleStart}
            />
          </View>
          <View>
            <CustomButton
              otherStyles="bg-b-red"
              text="cancel"
              OnPress={handleCancel}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EnterMachineNumber
