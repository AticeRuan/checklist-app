import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'

const CheckBox = ({ isChecked, onChange }) => {
  const handlePress = () => {
    onChange(!isChecked)
  }
  return (
    <Pressable
      onPress={(e) => {
        e.stopPropagation()
        handlePress()
      }}
      className="p-2 "
    >
      <Image
        source={isChecked ? icons.checkedIcon : icons.uncheckIcon}
        className="w-[28px] h-[28px]"
      />
    </Pressable>
  )
}

export default CheckBox
