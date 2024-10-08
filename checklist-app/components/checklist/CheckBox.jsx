import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'

const CheckBox = ({ isChecked, onChange }) => {
  const handlePress = () => {
    onChange(!isChecked)
  }
  return (
    <Pressable onPress={handlePress}>
      <Image
        source={isChecked ? icons.checkedIcon : icons.uncheckIcon}
        className="w-[23px] h-[23px]"
      />
    </Pressable>
  )
}

export default CheckBox
