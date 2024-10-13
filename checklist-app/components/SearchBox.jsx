import React, { useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
  Alert,
} from 'react-native'
import icons from '../constants/icons'

const SearchBox = ({
  value,
  onTextChange,
  placeholder = 'Enter keyword to search.',
}) => {
  return (
    <View
      className="w-full p-2 
              flex-row border-gray-300 rounded-lg  bg-white focus:border-b-active-blue border-2 my-4"
    >
      <Pressable>
        <Image
          source={icons.searchIcon}
          resizeMode="contain"
          className="w-5 h-5"
        />
      </Pressable>
      <TextInput
        value={value}
        onChangeText={onTextChange}
        placeholder={placeholder}
        placeholderTextColor="#b8b8b8"
        className="text-base flex-1 ml-2  "
        returnKeyType="search"
        keyBoardType="default"
      />
    </View>
  )
}

export default SearchBox
