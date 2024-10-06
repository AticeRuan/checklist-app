import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Header from '../../components/Header'

import { Tabs } from 'expo-router'

import icons from '../../constants/icons'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00AEEF',
          tabBarInactiveTintColor: '#A6D7F5',
          tabBarActiveBackgroundColor: '#fafafa',
          tabBarInactiveBackgroundColor: 'white',

          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'white',
            height: 100,
            boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.historyIcon}
                color={color}
                name="History"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="checklist"
          options={{
            title: 'Checklist',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.checklistIcon}
                color={color}
                name="Checklist"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="action"
          options={{
            title: 'Action',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.actionIcon}
                color={color}
                name="Action"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
