import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import SingleList from './SingleList'
import icons from '../../constants/icons'

const ListGroup = ({ category, listGroup, isNonEvn }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Pressable
      className="w-[70vw] py-[20px] border-t-2 border-b-2 border-b-lighter-grey mb-10"
      onPress={() => {
        setIsExpanded(!isExpanded)
      }}
    >
      <View className="flex-row justify-between items-center w-full ">
        <Text
          className="text-[24px] font-bold text-b-active-blue capitalize"
          style={{ color: isExpanded ? '#00AEEF' : '#00739E' }}
        >
          {category}
        </Text>
        <Image
          source={icons.backIcon}
          resizeMode="contain"
          className="w-[11px] h-[20.5px] rotate-[180deg] scale-75 mr-3"
          style={{
            transform: isExpanded
              ? [{ rotate: '270deg' }]
              : [{ rotate: '180deg' }],
          }}
        />
      </View>
      {isExpanded && (
        <View className="mt-6">
          {listGroup?.map((item, index) => (
            <SingleList key={index} singleList={item} isNonEvn={isNonEvn} />
          ))}
        </View>
      )}
    </Pressable>
  )
}

export default ListGroup
