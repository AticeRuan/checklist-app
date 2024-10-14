import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  Alert,
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import SearchBox from '../SearchBox'
import { useGetAllActionsBySiteQuery } from '../../api/actionApi'
import { useSelector, useDispatch } from 'react-redux'
import SingleAction from './SingleAction'
import { setActions } from '../../store/features/actionSlice'

import useRefreshing from '../../hooks/useRefreshing'
import icons from '../../constants/icons'
import EmptyState from '../EmptyState'
import DateRangePicker from '../DateRangePicker'
import useSiteDetails from '../../hooks/useSiteDetails'

const SupervisorActionList = ({ onLoading, onError }) => {
  const { siteId } = useSiteDetails()
  const {
    data: actions,
    isError: errorGetActions,
    isLoading: loadingActions,
    refetch,
  } = useGetAllActionsBySiteQuery(siteId)

  const [keyword, setKeyword] = useState('')
  const [selectedRange, setSelectedRange] = useState(null)
  const handleDateRangeChange = (range) => {
    setSelectedRange(range) // Set the selected range in parent state
  }

  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()
  const [showActive, setShowActive] = useState(true)
  const [activeActions, setActiveActions] = useState([])
  const [completedActions, setCompletedActions] = useState([])

  const handShowActive = () => {
    setShowActive(!showActive)
  }

  const onRefresh = async () => {
    triggerRefresh()
    await refetch()
    stopRefresh()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (actions) {
      dispatch(setActions(actions))

      setActiveActions(
        actions
          .filter((action) => action.completed === false)
          .sort((a, b) => a.is_read - b.is_read),
      )

      setCompletedActions(actions.filter((action) => action.completed === true))
    }
  }, [actions, dispatch])

  const localActions = useSelector((state) => state.flag.flags)

  const filteredActions = useMemo(() => {
    let filtered = []

    // Use the correct actions based on the showActive flag
    if (showActive) {
      filtered = activeActions || []
    } else {
      filtered = completedActions || []
    }

    // Filter by keyword if present
    if (keyword) {
      filtered = filtered.filter((item) =>
        item.content.toLowerCase().includes(keyword.toLowerCase()),
      )
    }

    // Filter by date range if selectedRange exists
    if (selectedRange && selectedRange.startDate && selectedRange.endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt) >= new Date(selectedRange.startDate) &&
          new Date(item.createdAt) <= new Date(selectedRange.endDate),
      )
    }

    return filtered
  }, [keyword, selectedRange, showActive, activeActions, completedActions])

  useEffect(() => {
    if (onLoading) {
      onLoading(loadingActions)
    }

    if (onError) {
      onError(errorGetActions)
    }
  }, [errorGetActions, errorGetActions])

  return (
    <>
      <View className="flex-row p-1 rounded-lg bg-b-light-blue mt-2 ">
        <Pressable
          className="flex-1 justify-center items-center py-2 rounded-lg"
          onPress={handShowActive}
          style={{ backgroundColor: showActive ? 'white' : 'transparent' }}
        >
          <Text
            className="text-xl"
            style={{
              fontWeight: showActive ? '600' : '500',
            }}
          >
            Active
          </Text>
        </Pressable>
        <Pressable
          className="flex-1 justify-center items-center py-1 rounded-lg"
          onPress={handShowActive}
          style={{ backgroundColor: !showActive ? 'white' : 'transparent' }}
        >
          <Text
            className="text-xl"
            style={{
              fontWeight: !showActive ? '700' : '500',
            }}
          >
            Completed
          </Text>
        </Pressable>
      </View>
      <SearchBox value={keyword} onTextChange={setKeyword} />
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      <FlatList
        data={filteredActions}
        keyExtractor={(item) => item.action_id.toString()}
        renderItem={({ item }) => (
          <SingleAction data={item} isSupervisor={true} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => <EmptyState />}
      />
    </>
  )
}

export default SupervisorActionList
