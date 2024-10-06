import { View, Text, Pressable, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import CustomPressable from './CustomPressable'

const CustomDropdown = ({
  label,
  otherContainerStyles,
  otherListStyles,
  data,
  text,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const handleSelect = (item) => {
    setSelectedItem(item)
    setModalVisible(false)
    onSelect(item)
  }
  const [isPressed, setIsPressed] = useState(false)
  const isPressStyle = isPressed ? 'translate-y-1' : ''
  return (
    <>
      <Pressable
        className={`min-w-[319px] min-h-[84px] rounded-[14px] bg-b-light-blue shadow-lg p-[15px] space-y-1 ${otherContainerStyles} ${isPressStyle} `}
        onPress={() => setModalVisible(true)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text className="text-b-mid-grey  text-xl font-psemibold">{label}</Text>
        <Text className="font-pregular text-lg  capitalize">{text}</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
          <View className="w-[319px] max-h-[400px] bg-white rounded-[14px] shadow-lg p-[15px]">
            <Text className="text-b-mid-grey text-[18px] font-psemibold mb-4">
              {label}
            </Text>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()} // Using index as key (if no id is present)
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => handleSelect(item)}
                  className={`py-2 px-4 rounded-lg ${otherListStyles}`}
                >
                  <Text className="text-b-dark-grey font-pregular text-lg capitalize ">
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <CustomPressable
              onPress={() => setModalVisible(false)}
              styles="mt-4 bg-b-mid-blue rounded-lg py-2 px-4"
              textStyles="text-white text-center text-lg "
              text="Close"
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

export default CustomDropdown
