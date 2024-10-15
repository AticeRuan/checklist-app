import { View, Text, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import CheckBox from './CheckBox'
import icons from '../../constants/icons'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleChecklist } from '../../store/features/checklistSlice'

const SingleItem = ({
  keyword,
  isChecked,
  hasAction,
  actionCompleted,
  onCheckChange,
  id,
  checklist_id,
  isEnv,
}) => {
  const dispatch = useDispatch()
  const singleItem = useSelector((state) => state.checklist.checklist)

  const handlePress = () => {
    router.push({
      pathname: `checklist/single-listitem/${id}`,
      params: { checklist_id },
    })
  }

  return (
    <Pressable
      className={`flex-row items-center justify-between w-full  mb-3 pb-1 border-b-2 border-b-lighter-grey  px-[10px]`}
      onPress={handlePress}
    >
      <Text
        className={
          isChecked
            ? 'text-2xl capitalize text-b-light-grey w-[80%]  '
            : 'text-2xl capitalize w-[80%]'
        }
      >
        {keyword}
      </Text>
      <View className="flex-row items-center justify-end">
        {hasAction && (
          <Image
            source={icons.actionIcon}
            resizeMode="contain"
            className="w-[19px]  mr-5 -mb-1"
            style={{ tintColor: actionCompleted ? '#E1B87F' : '#FD5A00' }}
          />
        )}

        {isEnv ? (
          <Image
            source={icons.addCommentIcon}
            resizeMode="contain"
            className="w-[19px]  mr-5 -mb-1"
          />
        ) : (
          <CheckBox isChecked={isChecked} onChange={onCheckChange} />
        )}
      </View>
    </Pressable>
  )
}

export default SingleItem
