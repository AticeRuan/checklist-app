import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import SingleItem from './SingleItem'
import icons from '../../constants/icons'

const SingleListDetail = () => {
  return (
    <View className="items-center justify-center gap-2">
      <View className="flex-row items-center justify-start ">
        <Image source={icons.backIcon} className="w-[28px] h-[41px] " />
        <Text className="text-[25px] font-pbold">Forklift</Text>
      </View>
      <Text className="text-b-mid-grey text-[16px]">Machine#:MFL887723 </Text>
      <FlatList
        data={[{ keyword: 'keyword', isChecked: false }]}
        keyExtractor={(item) => item.keyword}
        renderItem={({ item }) => (
          <SingleItem keyword={item.keyword} isChecked={item.isChecked} />
        )}
      />
    </View>
  )
}

export default SingleListDetail
