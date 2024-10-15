import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import icons from '../../constants/icons'
import { router } from 'expo-router'
import useUserDetails from '../../hooks/useUserDetails '

const SingleHistoryList = ({ checklist }) => {
  const { access_level } = useUserDetails()
  const isSupervisor = access_level === 2
  const [open, setOpen] = useState(false)
  const countTotalActions = (userChecks) => {
    return userChecks.reduce((total, userCheck) => {
      if (userCheck.has_action && userCheck.action !== null) {
        return total + 1 // Increment for each valid action
      }
      return total // No action, return the current total
    }, 0) // Start with a total of 0
  }

  const actionCount = countTotalActions(checklist.user_checks)

  const handlePress = (id) => {
    router.replace(`action/${id}`)
  }

  return (
    <View className="items-center">
      <Pressable
        onPress={() => setOpen(!open)}
        key={checklist.checklist_id}
        className="items-start justify-start w-[95%] p-3 border-b  border-b-[#E5E5E5]"
      >
        <View className="flex-row items-center justify-between w-[95%]">
          <Text
            key={checklist.checklist_id}
            className="text-b-active-blue text-xl font-semibold flex-1"
          >
            {checklist.template.title}
          </Text>
          {actionCount > 0 && (
            <Text className="text-b-orange">
              {' '}
              {actionCount === 1
                ? `${actionCount} action sent`
                : `${actionCount} actions sent`}
            </Text>
          )}

          <Image
            source={icons.backIcon}
            resizeMode="contain"
            style={{ transform: open ? 'rotate(270deg)' : 'rotate(180deg)' }}
            className="ml-3"
          />
        </View>
        {isSupervisor && (
          <Text className="text-b-mid-grey">by {checklist.checked_by}</Text>
        )}
      </Pressable>
      {open && (
        <View className="items-start  w-full px-10 pb-3 pt-2 ">
          {checklist.machine_id && (
            <Text className="text-lg font-pregular text-b-mid-grey mb-4">
              Machine#1222
            </Text>
          )}
          {checklist.user_checks.map((userCheck) => (
            <View
              className="flex-row items-center justify-between mb-2 "
              key={userCheck.user_check_id}
            >
              <Text
                className="flex-1 text-xl"
                style={{ color: userCheck.is_checked ? 'grey' : 'black' }}
              >
                {userCheck.list_item.keyword}
              </Text>
              {userCheck.action !== null ? (
                <Pressable
                  onPress={() => {
                    handlePress(userCheck.action.action_id)
                  }}
                >
                  <Image
                    source={icons.actionIcon}
                    resizeMode="contain"
                    style={{
                      tintColor: userCheck.action.completed
                        ? '#F5E1A4'
                        : '#FF3B30',
                    }}
                    className="w-[20px] h-[20px] "
                  />
                </Pressable>
              ) : userCheck.is_checked ? (
                <Image
                  source={icons.checkedIcon}
                  resizeMode="contain"
                  className="w-[20px] h-[20px] "
                />
              ) : (
                <Image
                  source={icons.uncheckIcon}
                  resizeMode="contain"
                  className="w-[20px] h-[20px] "
                />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default SingleHistoryList
