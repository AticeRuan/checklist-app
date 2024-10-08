import { View, Text, Pressable } from 'react-native'
import { useState } from 'react'

const CustomButton = ({
  text,
  otherStyles,
  OnPress = () => {},
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const pressStyles = isPressed ? 'opacity-50 translate-y-1' : ''
  const disabledStyles = disabled ? 'bg-b-lighter-grey ' : ''
  return (
    <Pressable
      onPress={OnPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      className={` ${otherStyles}  min-h-[64px] rounded-[50px] min-w-[320px] items-center justify-center ${pressStyles} ${disabledStyles} transition-all duration-700 `}
    >
      <Text className="text-[25px] font-[600] capitalize text-white">
        {text}
      </Text>
    </Pressable>
  )
}

export default CustomButton
