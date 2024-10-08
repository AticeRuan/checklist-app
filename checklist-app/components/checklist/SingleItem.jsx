import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import CheckBox from './CheckBox'
import icons from '../../constants/icons'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { setSingleChecklist } from '../../store/features/checklistSlice'
const SingleItem = ({
  keyword,
  isChecked,
  hasAction,
  actionCompleted,
  onCheckChange,
  id,
  item,
}) => {
  const dispatch = useDispatch()
  const handlePress = () => {
    dispatch(setSingleChecklist(item))
    router.push(`checklist/single-listitem/${id}`)
  }
  const [isPress, setIsPress] = useState(false)
  const pressStyles = isPress ? 'translate-y-1 ' : ''
  return (
    <Pressable
      className={`flex-row items-center justify-between w-full  mb-3 pb-1 border-b-2 border-b-lighter-grey ${pressStyles}`}
      onPress={handlePress}
    >
      <Text className="text-2xl capitalize">{keyword}</Text>
      <View className="flex-row items-end justify-center">
        {hasAction && (
          <Image
            source={icons.actionIcon}
            resizeMode="contain"
            className="w-[19px]  mr-5 -mb-1"
            style={{ tintColor: actionCompleted ? '#E1B87F' : '#FD5A00' }}
          />
        )}

        <CheckBox isChecked={isChecked} onChange={onCheckChange} />
      </View>
    </Pressable>
  )
}

export default SingleItem
