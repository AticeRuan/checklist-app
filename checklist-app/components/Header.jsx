import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../assets/ballance.png'
import { setSingleSite } from '../store/features/siteSlice'
import { router } from 'expo-router'
const Header = () => {
  const site = useSelector((state) => state.site.singleSite)
  const dispatch = useDispatch()
  const onChangeSitePress = () => {
    dispatch(setSingleSite(null))
    router.replace('/')
  }
  return (
    <View className="w-full px-[5vw] items-center justify-between   flex-row bg-b-mid-blue">
      <Image source={Logo} resizeMode="contain" className="w-[80px] h-[80px]" />
      <View className="flex-row items-center justify-center">
        <Text className="mr-1 text-white font-pregular text-xl">Site:</Text>
        <Pressable onPress={onChangeSitePress}>
          <Text className="underline capitalize text-white font-pregular tracking-wide text-xl">
            {site}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Header
