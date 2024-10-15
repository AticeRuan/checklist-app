import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Keyboard,
  RefreshControl,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../../components/Header'
import { useGlobalSearchParams, router } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import CustomButton from '../../../../components/CustomButton'
import LoadingScreen from '../../../../components/LoadingScreen'
import {
  useGetUserChecksByChecklistQuery,
  useUpdateCheckMutation,
} from '../../../../api/userCheckApi'
import useRefreshing from '../../../../hooks/useRefreshing'
import { updateSingleChecklist } from '../../../../store/features/checklistSlice'
import icons from '../../../../constants/icons'
import { useAddActionMutation } from '../../../../api/actionApi'
import { updateChecklist } from '../../../../store/features/checklistSlice'
import useSiteDetails from '../../../../hooks/useSiteDetails'

const SingleListItem = () => {
  const { id, checklist_id } = useGlobalSearchParams()
  const { siteId } = useSiteDetails()
  //user details
  const user = useSelector((state) => state.user.user)
  const users = useSelector((state) => state.user.users)
  const userName = users?.find((u) => u.name === user)?.username
  const dispatch = useDispatch()
  const {
    data: userChecks,
    error: userChecksError,
    isLoading: userChecksLoading,
    refetch,
  } = useGetUserChecksByChecklistQuery(checklist_id)
  const [updateCheck, { isLoading: updateCheckLoading, isSuccess }] =
    useUpdateCheckMutation()

  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()

  const onRefresh = async () => {
    triggerRefresh()
    await refetch()
    stopRefresh()
  }

  const userCheck = userChecks?.find(
    (check) => check.user_check_id === Number(id),
  )

  useEffect(() => {
    if (userCheck) {
      console.log('action:', userCheck.action)
    }
  }, [userCheck])

  const [showAction, setShowAction] = useState(false)
  const handleCheckChange = async (currentValue) => {
    try {
      const payload = {
        id: id,
        is_checked: !currentValue,
        checklist_id: checklist_id,
      }

      const udpatedChecklist = await updateCheck(payload).unwrap()
      if (isSuccess) {
        dispatch(updateSingleChecklist(udpatedChecklist.checklist))
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  //send action
  const [action, setAction] = useState({
    user_check_id: id,
    content: '',
    image_url: '',
    sender: userName,
    site_id: siteId,
  })
  const [addAction, { isLoading: addActionLoading, error }] =
    useAddActionMutation()

  const handleSubmitAction = async () => {
    if (showAction || userCheck.list_item.is_environment_related) {
      try {
        if (action.content === '') {
          Alert.alert('Entry required', 'Please enter a description', [
            {
              text: 'OK',
              onPress: () => {
                setShowAction(false)
              },
            },
          ])
        }

        const newAction = await addAction(action).unwrap()
        console.log('newAction:', newAction)
        if (newAction) {
          setShowAction(false)
          refetch()
          Alert.alert('Success', 'Action sent', [
            {
              text: 'OK',
              onPress: () => {
                router.replace(`checklist/single-checklist/${checklist_id}`)
              },
            },
          ])
        }
      } catch (error) {
        Alert.alert('Failed to send action')
        console.log('error:', error)
      }
    } else {
      setShowAction(true)
      setAction({ ...action, content: '' })
    }
  }

  const handleViewAction = () => {
    router.push(`action/${userCheck.action.action_id}`)
  }

  if (userChecksLoading || updateCheckLoading || addActionLoading) {
    return <LoadingScreen />
  }

  if (userChecksError) {
    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="items-center justify-center flex-1 w-full">
            <Text className="text-white">Failed to load checklist.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1 ">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 px-[10px] p-[30px] min-h-full">
        {userCheck?.list_item ? (
          <>
            <Text className="text-3xl mb-10 text-b-active-blue font-bold">
              {userCheck.list_item.keyword}
            </Text>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
              scrollEnabled={true}
            >
              {userCheck.list_item.is_environment_related ? (
                <View className="w-full items-start justify-center">
                  <View className="flex-row items-center justify-center mb-6">
                    {userCheck.action && (
                      <Image
                        source={icons.actionIcon}
                        resizeMode="contain"
                        className="w-[26px] h-[26px]  mr-5"
                        style={{
                          tintColor: userCheck.action.completed
                            ? '#F5E1A4'
                            : '#FF0000',
                        }}
                      />
                    )}

                    <Text className="text-b-mid-grey text-2xl  flex-1">
                      {userCheck.list_item.description}
                    </Text>
                  </View>

                  {/* input area */}

                  {userCheck.action === null && (
                    <View className="border-2 border-b-lighter-grey w-full mb-10 rounded-lg p-2 min-h-[30vh]">
                      <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                      >
                        <TextInput
                          className="flex-1 w-full p-2 text-lg"
                          keyboardType="text"
                          placeholder="Describe the action"
                          placeholderTextColor="#b8b8b8"
                          multiline={true}
                          value={action.content}
                          onChangeText={(e) =>
                            setAction({ ...action, content: e })
                          }
                        />
                      </ScrollView>
                      <Pressable
                        className="border-dashed border-2 border-b-light-grey w-[100px] h-[100px] rounded-r-md items-center justify-center"
                        onPress={() => {
                          router.push('camera')
                        }}
                      >
                        <Image
                          source={icons.uploadIcon}
                          resizeMode="contain"
                          className="w-[15px] h-[18px]"
                        />
                        <Text className="text-b-mid-grey text-lg">
                          Add Photo
                        </Text>
                      </Pressable>
                    </View>
                  )}

                  {userCheck.action === null ? (
                    <CustomButton
                      text="Send Action"
                      otherStyles="border-2 border-b-active-blue  bg-b-active-blue text-black "
                      OnPress={handleSubmitAction}
                    />
                  ) : (
                    <CustomButton
                      text="View Action"
                      otherStyles="border-2 border-b-active-blue  bg-b-active-blue text-black "
                      OnPress={handleViewAction}
                    />
                  )}
                </View>
              ) : (
                <View className="w-full items-start justify-center">
                  <View className="flex-row items-center justify-center mb-6">
                    {userCheck.action ? (
                      <Image
                        source={icons.actionIcon}
                        resizeMode="contain"
                        className="w-[26px] h-[26px]  mr-5"
                        style={{
                          tintColor: userCheck.action.completed
                            ? '#F5E1A4'
                            : '#FF0000',
                        }}
                      />
                    ) : (
                      <Image
                        source={
                          userCheck.is_checked
                            ? icons.checkedIcon
                            : icons.uncheckIcon
                        }
                        resizeMode="contain"
                        className="w-[26px] h-[26px]  mr-5"
                      />
                    )}

                    <Text className="text-b-mid-grey text-2xl  flex-1">
                      {userCheck.list_item.description}
                    </Text>
                  </View>

                  <CustomButton
                    text={userCheck.is_checked ? 'uncheck' : 'check'}
                    otherStyles={
                      userCheck.is_checked
                        ? 'bg-b-red mb-10'
                        : ' bg-b-mid-blue mb-10'
                    }
                    OnPress={() => handleCheckChange(userCheck.is_checked)}
                  />
                  {/* input area */}
                  {showAction && (
                    <View className="border-2 border-b-lighter-grey w-full mb-10 rounded-lg p-2 min-h-[30vh]">
                      <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                      >
                        <TextInput
                          className="flex-1 w-full p-2 text-lg"
                          keyboardType="text"
                          placeholder="Describe the action"
                          placeholderTextColor="#b8b8b8"
                          multiline={true}
                          value={action.content}
                          onChangeText={(e) =>
                            setAction({ ...action, content: e })
                          }
                        />
                      </ScrollView>
                      <Pressable
                        className="border-dashed border-2 border-b-light-grey w-[100px] h-[100px] rounded-r-md items-center justify-center"
                        onPress={() => {
                          router.push('camera')
                        }}
                      >
                        <Image
                          source={icons.uploadIcon}
                          resizeMode="contain"
                          className="w-[15px] h-[18px]"
                        />
                        <Text className="text-b-mid-grey text-lg">
                          Add Photo
                        </Text>
                      </Pressable>
                    </View>
                  )}
                  {userCheck.action === null ? (
                    <CustomButton
                      text="Send Action"
                      otherStyles="border-2 border-b-active-blue  bg-b-active-blue text-black "
                      OnPress={handleSubmitAction}
                    />
                  ) : (
                    <CustomButton
                      text="View Action"
                      otherStyles="border-2 border-b-active-blue  bg-b-active-blue text-black "
                      OnPress={handleViewAction}
                    />
                  )}
                </View>
              )}
            </ScrollView>
          </>
        ) : (
          <Text className="text-b-mid-grey text-2xl mb-9">
            No List Item Data Available
          </Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default SingleListItem
