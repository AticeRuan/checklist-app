import { View, Text, Pressable } from 'react-native'
import React from 'react'
import setDateFormat from '../../lib/dateFormater'
import { router } from 'expo-router'

const SingleAction = ({ data, isSupervisor = false }) => {
  const truncateTextAtWord = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...'
  }
  const handleOnPress = () => {
    router.push(`action/${data.action_id}`)
  }

  return (
    <Pressable
      className="w-full mb-5 flex-row justify-between items-center bg-gray-100 p-2 rounded-md"
      onPress={handleOnPress}
    >
      <View className="flex-row items-center justify-center">
        {!isSupervisor && (
          <Text
            className="text-4xl mr-2 font-bold"
            style={data.completed ? { color: '#00AD11' } : { color: '#FF3B30' }}
          >
            •
          </Text>
        )}

        {isSupervisor ? (
          <Pressable>
            <Text
              className="text-xl  "
              style={
                data.is_read
                  ? { color: '#757575', fontWeight: 400 }
                  : { color: '#333333', fontWeight: 600 }
              }
            >
              {truncateTextAtWord(data.content, 20)}
            </Text>
            <Text className="text-b-mid-grey">by {data.sender}</Text>
          </Pressable>
        ) : (
          <Text
            className="text-xl  "
            style={
              data.completed
                ? { color: '#757575', fontWeight: 400 }
                : { color: '#333333', fontWeight: 600 }
            }
          >
            {truncateTextAtWord(data.content, 20)}
          </Text>
        )}
      </View>
      <Text className="text-b-mid-grey">{setDateFormat(data.createdAt)}</Text>
    </Pressable>
  )
}

export default SingleAction
