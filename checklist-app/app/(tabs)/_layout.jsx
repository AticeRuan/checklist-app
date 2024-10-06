import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Logo from '../../assets/ballance.png'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
const TabsLayout = () => {
  const site = useSelector((state) => state.site.sites)
  const onChangeSitePress = () => {
    router.replace('/')
  }
  return (
    <View>
      <View className="w-full px-10 items-center justify-between -top-[90px]  absolute flex-row">
        <View className="w-[100px] h-[100px]  ">
          <Image source={Logo} resizeMode="cotain" />
        </View>
        <View className="flex-row items-center justify-center">
          <Text className="mr-1 text-white font-pregular text-[16px]">
            Site:
          </Text>
          <Pressable onPress={onChangeSitePress}>
            <Text className="underline capitalize text-white font-psemibold text-[16px]">
              {site}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default TabsLayout
