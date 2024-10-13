import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

const CustomPressable = ({ text, styles, textStyles, disabled, ...props }) => {
  const [pressed, setPressed] = useState(false)
  const pressStyles = pressed ? 'opacity-50 translate-y-1' : ''
  const disabledStyles = disabled ? 'bg-b-lighter-grey ' : ''
  return (
    <Pressable
      {...props}
      className={`${styles} ${pressStyles} ${disabledStyles}`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Text className={`${textStyles}`}>{text}</Text>
    </Pressable>
  )
}

export default CustomPressable
