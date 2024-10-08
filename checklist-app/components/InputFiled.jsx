import { View, Text, Pressable, Modal, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'

const Inputfiled = ({
  label,
  otherContainerStyles,
  otherListStyles,
  value,
  placeholder,
  handleChangeText,
  ...props
}) => {
  //

  return (
    <>
      <View
        className={`min-w-[319px] h-[100px] rounded-[14px] bg-b-light-blue shadow-lg p-[15px] space-y-1 ${otherContainerStyles} `}
      >
        <Text className="text-b-mid-grey  text-xl font-psemibold">{label}</Text>
        <TextInput
          className="flex-1 text-b-deep-blue  bg-white p-2 rounded-xl text-2xl "
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          {...props}
        />
      </View>
    </>
  )
}

export default Inputfiled
