import React, { useState } from 'react'
import { View, Text, Modal, Button, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const DateRangePicker = ({ onDateRangeChange }) => {
  const [customStartDate, setCustomStartDate] = useState(null) // Set to null initially
  const [customEndDate, setCustomEndDate] = useState(null) // Set to null initially
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDateRangePicker, setShowDateRangePicker] = useState(false) // Manage picker state visibility
  const [isPressed, setIsPressed] = useState(false)

  const [selectedOption, setSelectedOption] = useState(null)

  const dateOptions = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 30 Days', value: 30 },
    { label: 'Last 60 Days', value: 60 },
    { label: 'Last 3 Months', value: 90 },
    { label: 'Last 6 Months', value: 180 },
  ]

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : ''
  }

  const handlePredefinedRange = (days) => {
    const endDate = new Date() // Current date
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - days) // Calculate start date based on range
    setSelectedOption(days)
    // Pass the calculated date range to the parent component
    onDateRangeChange({ startDate, endDate })
    setCustomStartDate(startDate)
    setCustomEndDate(endDate)
    setShowModal(false)
  }

  const handleCustomDateRange = () => {
    // Pass the selected custom date range to the parent component
    if (customStartDate && customEndDate) {
      onDateRangeChange({ startDate: customStartDate, endDate: customEndDate })
      setShowModal(false) // Close the modal after selection
    }
  }

  const handleClearDateRange = () => {
    setCustomStartDate(null)
    setCustomEndDate(null)
    onDateRangeChange(null)
    setShowModal(false)
    setSelectedOption(null)
    setShowEndPicker(false)
    setShowStartPicker(false)
  }

  return (
    <View className="w-full">
      <Pressable
        onPress={() => setShowModal(true)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        className="bg-b-mid-blue mb-3 p-3 rounded-lg w-full"
        style={{
          transform: [{ scale: isPressed ? 0.95 : 1 }],
          backgroundColor: showDateRangePicker ? '#FD5A00' : '#00AEEF',
        }}
      >
        <Text className=" text-white font-psemibold">
          {customStartDate && customEndDate
            ? `Selected Range: ${formatDate(customStartDate)} - ${formatDate(
                customEndDate,
              )}`
            : 'Select Date Range'}
        </Text>
      </Pressable>

      {/* Date Range Picker Modal */}
      {showModal && (
        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            className="flex-1 justify-center items-center "
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <View className="bg-white p-5 rounded-lg w-11/12">
              {/* Predefined Date Range Options */}
              <Text className="text-center text-gray-500 mb-2 uppercase text-xl font-psemibold">
                Select Date Range
              </Text>
              {dateOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handlePredefinedRange(option.value)}
                  className="bg-gray-200 p-3 mb-2 rounded-lg"
                  style={{
                    backgroundColor:
                      selectedOption === option.value ? '#00AD11' : '#DDDDDD',
                  }}
                >
                  <Text
                    className="text-xl"
                    style={{
                      color:
                        selectedOption === option.value ? '#FFFFFF' : '#000000',
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
              <View className="p-2 border-2 border-gray-100 rounded-lg bg-gray-50">
                <Text className="text-center text-gray-500 mb-2 uppercase text-xl font-psemibold">
                  OR SELECT CUSTOM RANGE
                </Text>
                {/* Custom Date Range Picker */}
                <Pressable
                  onPress={() => setShowStartPicker(true)}
                  className="bg-gray-200 p-3 mb-2 rounded-lg"
                  style={{
                    backgroundColor: customStartDate ? '#A6D7F5' : '#DDDDDD',
                  }}
                >
                  <Text className="text-lg">
                    {customStartDate
                      ? `Start Date: ${formatDate(customStartDate)}`
                      : 'Select Custom Start Date'}
                  </Text>
                </Pressable>
                {showStartPicker && (
                  <DateTimePicker
                    value={customStartDate || new Date()} // Use current date if null
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setCustomStartDate(selectedDate || customStartDate)
                      setShowStartPicker(false)
                    }}
                    style={{ marginBottom: 10 }}
                  />
                )}
                <View>
                  <Pressable
                    onPress={() => setShowEndPicker(true)}
                    className="bg-gray-200 p-3 mb-2 rounded-lg"
                    style={{
                      backgroundColor: customStartDate ? '#A6D7F5' : '#DDDDDD',
                    }}
                  >
                    <Text className="text-lg">
                      {customEndDate
                        ? `End Date: ${formatDate(customEndDate)}`
                        : 'Select Custom End Date'}
                    </Text>
                  </Pressable>
                  {showEndPicker && (
                    <DateTimePicker
                      value={customEndDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setCustomEndDate(selectedDate || customEndDate)
                        setShowEndPicker(false)
                      }}
                      style={{ marginBottom: 10, color: 'black' }}
                    />
                  )}
                </View>

                {/* Apply Custom Range Button */}
                <Button
                  title="Apply Custom Range"
                  onPress={handleCustomDateRange}
                />
              </View>

              {/* Clear Date Range Button */}
              <Button title="Clear Date Range" onPress={handleClearDateRange} />

              {/* Close Modal Button */}
              <Button title="Cancel" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default DateRangePicker
