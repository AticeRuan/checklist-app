import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from './CheckBox'

const SingleItem = ({ keyword, isChecked }) => {
  return (
    <View className="flex-row items-center justify-between w-full">
      <Text>{keyword}</Text>
      <CheckBox isChecked={isChecked} />
    </View>
  )
}

export default SingleItem
