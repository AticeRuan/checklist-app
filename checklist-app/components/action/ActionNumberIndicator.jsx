import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetAllActionsBySiteQuery } from '../../api/actionApi'
import { useSelector } from 'react-redux'
import useSiteDetails from '../../hooks/useSiteDetails'
import useUserDetails from '../../hooks/useUserDetails '

const ActionNumberIndicator = ({}) => {
  const { siteId } = useSiteDetails()
  const { data } = useGetAllActionsBySiteQuery(siteId)

  const [number, setNumber] = useState(0)
  useEffect(() => {
    if (data) {
      // Filter the unread actions and get the length
      const unreadActionsCount = data.filter(
        (action) => action.is_read === false,
      ).length
      setNumber(unreadActionsCount)
    }
  }, [data]) // Add 'data' as a dependency to update when data changes
  if (number === 0) return null

  return (
    <View className="absolute -top-2 -right-2 bg-b-red rounded-full w-4 h-4 items-center justify-center">
      <Text className="text-white ">{number}</Text>
    </View>
  )
}

export default ActionNumberIndicator
