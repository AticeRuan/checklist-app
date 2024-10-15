import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import SingleItem from './SingleItem'
import icons from '../../constants/icons'
import dateFormat, { masks } from 'dateformat'
import { router } from 'expo-router'
import setDateFormat from '../../lib/dateFormater'

const SingleList = ({ singleList, isNonEvn = true, isMachine }) => {
  const totalItems = singleList?.user_checks.length || 0
  const completedItems = singleList?.user_checks?.filter(
    (item) => item.is_checked || item.has_action,
  ).length
  masks.default = 'dd/mmm/yy'
  //if due date 's year is different from current year, show year

  const date = dateFormat(singleList?.due_date, 'default')
  const id = singleList?.checklist_id

  // useEffect(() => {
  //   console.log('completedItems of', singleList.template.title, completedItems)
  // }, [id])

  const checkIsMachineRelated = (checklist) => {
    const flag = checklist.template.is_machine_related
    if (!flag) {
      return false
    }
    return flag
  }

  const handleOnPress = () => {
    if (checkIsMachineRelated(singleList) && !singleList.machine_id)
      return router.push(`checklist/enter-machine-number/${id}`)
    else router.push(`checklist/single-checklist/${id}`)
  }

  return (
    <Pressable
      className="items-center justify-around  flex-row w-[90%] py-[11px] mx-[10px] border-b-2 border-gray-100 my-2"
      onPress={handleOnPress}
    >
      <Text className="text-xl text-b-mid-blue font-semibold flex-1  ">
        {singleList?.template.title}
      </Text>
      <View className="flex-row items-center justify-center gap-10 flex-1">
        {isNonEvn && (
          <View className="items-end justify-start">
            <Text className="text-[16px] text-b-dark-orange font-semibold">
              {completedItems}/{totalItems}
            </Text>
            <Text className="text-[16px] text-b-dark-orange font-semibold">
              Due {date}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}

export default SingleList
