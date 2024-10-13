import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Modal,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import setDateFormat from '../../lib/dateFormater'
import icons from '../../constants/icons'
import { useDispatch } from 'react-redux'
import {
  useUpdateActionMutation,
  useCompleteActionMutation,
} from '../../api/actionApi'
import { updateAction as updateActionState } from '../../store/features/actionSlice'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { useAddCommentMutation } from '../../api/commentApi'
import useUserDetails from '../../hooks/useUserDetails '

const SingleActionDetails = ({ action, access_level }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { username } = useUserDetails()
  const [actionToUpdate, setActionToUpdate] = useState(action)
  const handleEditPress = () => {
    setIsEditing(true)
  }
  const [
    updateAction,
    { isLoading: updateActionLoading, isSuccess: isSuceesUpdate },
  ] = useUpdateActionMutation()
  const [
    completeAction,
    { isLoading: completeActionLoading, isSuccess: isSuccesCompleted },
  ] = useCompleteActionMutation()

  const [addComment, { isLoading: addCommentLoading, isSuccess }] =
    useAddCommentMutation()

  const [comment, setComment] = useState({
    content: '',
    action_id: action.action_id,
    username: username,
  })
  const [makingComment, setMakingComment] = useState(false)

  const handleAddComment = async () => {
    if (comment.content === '') {
      Alert.alert('Comment cannot be empty')
      return
    }
    try {
      console.log('Payload being sent to addComment:', comment)
      const newComment = await addComment(comment).unwrap()

      if (newComment) {
        Alert.alert('Comment added successfully')
        setComment('')
        setMakingComment(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Failed to add comment')
    }
  }

  const dispatch = useDispatch()

  const handleUpdateAction = async () => {
    try {
      const payload = {
        ...actionToUpdate,
        id: actionToUpdate.action_id,
        content: actionToUpdate.content,
      }
      const updatedAction = await updateAction(payload)

      if (isSuccess) {
        dispatch(updateActionState(updatedAction))
        Alert.alert('Action updated successfully')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
    }
  }
  const handleCompleteAction = async () => {
    try {
      const completedAction = await completeAction(actionToUpdate.action_id)

      if (isSuccesCompleted) {
        dispatch(updateActionState(completedAction))
        Alert.alert('Action completed successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }
  //   useEffect(() => {
  //     console.log('action:', action.comments)
  //   }, [action])

  return (
    <>
      <View className="w-[80vw]  items-start justify-start">
        <Text>{action.user_check.checklist.template.title}</Text>
        <Text>{action.user_check.list_item.keyword}</Text>
        {access_level === 3 && (
          <Text style={{ color: action.completed ? '#066F10' : '#FD5A00' }}>
            {action.completed ? 'Completed' : 'Pending'}
          </Text>
        )}
        {action.user_check.checklist.machine_id && (
          <Text>Machine#{action.user_check.checklist.machine_id}</Text>
        )}
        {isEditing ? (
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
                value={actionToUpdate.content}
                onChangeText={(e) =>
                  setActionToUpdate({ ...actionToUpdate, content: e })
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
              <Text className="text-b-mid-grey text-lg">Add Photo</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text>Description</Text>
            <Text>{action.content}</Text>
          </>
        )}
        <Text>Sent by:{action.sender}</Text>
        {action.createdAt !== action.updatedAt ? (
          <Text>Last Updated by:{setDateFormat(action.updatedAt)}</Text>
        ) : (
          <Text>{setDateFormat(action.createdAt)}</Text>
        )}
        <Pressable disable={action.comments.length === 0}>
          <Text
            style={{
              color: action.comments.length === 0 ? '#BDBDBD' : '#00AEEF',
            }}
          >
            Comment ({action.comments.length})
          </Text>
        </Pressable>
      </View>
      <View className="w-full items-center mt-5">
        {access_level === 3 ? (
          isEditing ? (
            <Pressable
              className="h-10 rounded-md w-40 bg-b-mid-blue items-center justify-center"
              onPress={handleUpdateAction}
              disabled={updateActionLoading}
              style={{ opacity: updateActionLoading ? 0.5 : 1 }}
            >
              <Text className=" text-xl font-semibold">
                {updateActionLoading ? 'Updating' : 'Update'}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              className="h-10 rounded-md w-40 bg-b-mid-blue items-center justify-center"
              onPress={handleEditPress}
            >
              <Text className=" text-xl font-semibold">Edit</Text>
            </Pressable>
          )
        ) : (
          <View className="w-full items-center">
            <Pressable
              className="h-10 rounded-md w-40 bg-b-mid-blue items-center justify-center mb-5"
              onPress={handleCompleteAction}
              disabled={completeActionLoading || action.completed}
              style={{
                opacity: completeActionLoading || action.completed ? 0.5 : 1,
              }}
            >
              <Text className=" text-xl font-semibold">
                {action.completed
                  ? 'Completed'
                  : completeActionLoading
                  ? 'Completing'
                  : 'Complete'}
              </Text>
            </Pressable>
            {makingComment && (
              <Modal
                visible={makingComment}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setMakingComment(false)}
              >
                <View
                  className="flex-1 justify-center items-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <View className="bg-white border-2 border-b-lighter-grey w-11/12 rounded-lg p-4 min-h-[30vh]">
                    <ScrollView
                      contentContainerStyle={{ flexGrow: 1 }}
                      keyboardShouldPersistTaps="handled"
                    >
                      <TextInput
                        className="flex-1 w-full p-2 text-lg"
                        keyboardType="text"
                        placeholder="Make a comment"
                        placeholderTextColor="#b8b8b8"
                        multiline={true}
                        value={comment.content}
                        onChangeText={(e) =>
                          setComment({ ...comment, content: e })
                        }
                      />
                    </ScrollView>

                    <Pressable
                      className="mt-4  p-3 rounded-lg items-center bg-b-light-blue "
                      onPress={handleAddComment}
                      disabled={addCommentLoading}
                    >
                      <Text className=" text-xl font-semibold text-b-dark-blue">
                        {addCommentLoading ? 'Adding Comment' : 'Add Comment'}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setMakingComment(false)}
                      className="mt-4 bg-b-orange p-3 rounded-lg items-center"
                    >
                      <Text className="text-white text-xl">Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            )}
            <Pressable
              className="h-10 rounded-md w-40  items-center justify-center border-2 border-b-active-blue "
              onPress={() => setMakingComment(true)}
            >
              <Text className=" text-xl font-semibold text-b-active-blue">
                Add Comment
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  )
}

export default SingleActionDetails
