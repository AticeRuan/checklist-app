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
} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import SearchBox from '../SearchBox'
import { useGetActionByUserQuery } from '../../api/actionApi'
import { useSelector, useDispatch } from 'react-redux'
import SingleAction from './SingleAction'
import { setActions } from '../../store/features/actionSlice'
import useRefreshing from '../../hooks/useRefreshing'
import icons from '../../constants/icons'
import EmptyState from '../EmptyState'
import DateRangePicker from '../DateRangePicker'

const StaffActionList = ({ username, onLoading, onError }) => {
  const {
    data: actionsByUsers,
    isError: errorGetActionsByUsers,
    isLoading: loadingActionsByUsers,
    refetch,
  } = useGetActionByUserQuery(username)
  const [keyword, setKeyword] = useState('')
  const [selectedRange, setSelectedRange] = useState(null)
  const handleDateRangeChange = (range) => {
    setSelectedRange(range) // Set the selected range in parent state
  }

  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()

  const onRefresh = async () => {
    triggerRefresh()
    await refetch()
    stopRefresh()
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (actionsByUsers) {
      dispatch(setActions(actionsByUsers))
    }
  }, [actionsByUsers, dispatch])

  const localActions = useSelector((state) => state.flag.flags)

  const filteredActions = useMemo(() => {
    let filtered = localActions
    // Filter by keyword
    if (keyword) {
      filtered = filtered.filter((item) =>
        item.content.toLowerCase().includes(keyword.toLowerCase()),
      )
    }

    // Filter by date range
    if (selectedRange) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt) >= selectedRange.startDate &&
          new Date(item.createdAt) <= selectedRange.endDate,
      )
    }
    return filtered
  }, [keyword, selectedRange, localActions])

  const handleSearch = (searchTerm) => {
    setKeyword(searchTerm)
  }

  useEffect(() => {
    if (onLoading) {
      onLoading(loadingActionsByUsers)
    }

    if (onError) {
      onError(errorGetActionsByUsers)
    }
  }, [loadingActionsByUsers, errorGetActionsByUsers])

  return (
    <>
      <SearchBox value={keyword} onTextChange={setKeyword} />
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      <FlatList
        data={filteredActions}
        keyExtractor={(item) => item.action_id.toString()}
        renderItem={({ item }) => <SingleAction data={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => <EmptyState />}
      />
    </>
  )
}

export default StaffActionList
