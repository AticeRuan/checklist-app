import { View, Text, RefreshControl, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import EmptyState from '../EmptyState'
import DateRangePicker from '../DateRangePicker'
import SearchBox from '../SearchBox'
import useRefreshing from '../../hooks/useRefreshing'
import { useGetAllChecklistBySiteQuery } from '../../api/checklistApi'
import useSiteDetails from '../../hooks/useSiteDetails'
import useUserDetails from '../../hooks/useUserDetails '
import { setDateForHistoryTab } from '../../lib/dateFormater'
import LoadingScreen from '../LoadingScreen'
import { router } from 'expo-router'
import SingleHistoryList from './SingleHistoryList'

const SupervisorHistoryList = ({ siteId }) => {
  const [keyword, setKeyword] = useState('')
  const [selectedRange, setSelectedRange] = useState(null)
  //   const [displayData, setDisplayData] = useState([])
  const handleDateRangeChange = (range) => {
    setSelectedRange(range)
  }
  const {
    data: checklists,
    isLoading,
    isError,
    refetch,
  } = useGetAllChecklistBySiteQuery(siteId)
  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()
  const onRefresh = async () => {
    triggerRefresh()
    await refetch()
    stopRefresh()
  }

  const isDueDateAfterToday = (dueDate) => {
    const due = new Date(dueDate)
    const now = new Date()
    return due < now
  }

  const filteredChecklists = checklists?.filter((checklist) =>
    isDueDateAfterToday(checklist.due_date),
  )

  const filteredHistory = useMemo(() => {
    let filtered = filteredChecklists

    // Filter by keyword
    if (keyword) {
      filtered = filtered.filter((item) =>
        item.template.title.toLowerCase().includes(keyword.toLowerCase()),
      )

      return filtered
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
  }, [keyword, selectedRange, filteredChecklists])

  const groupedChecklistsByDueDate = useMemo(() => {
    if (keyword) return [] // Return an empty group when keyword is present

    return filteredHistory?.reduce((acc, checklist) => {
      const dueDate = checklist.due_date // Use raw due_date

      // Count the number of valid actions in user_checks for the current checklist
      const actionCount = checklist.user_checks.reduce((total, userCheck) => {
        // Check if the action exists and is a valid object
        const hasAction = userCheck.action ? 1 : 0
        return total + hasAction
      }, 0)

      // Check if the dueDate already exists in the accumulator
      const existingGroup = acc.find((group) => group.dueDate === dueDate)

      if (existingGroup) {
        // If it exists, increment the count, add the action count, and add the checklist to the group
        existingGroup.count += 1
        existingGroup.totalActions += actionCount
        existingGroup.checklists.push(checklist)
      } else {
        // If it doesn't exist, create a new group
        acc.push({
          dueDate: dueDate,
          count: 1, // Start the count at 1
          totalActions: actionCount, // Start with the current checklist's action count
          checklists: [checklist], // Add the checklist to the new group
        })
      }

      return acc
    }, [])
  }, [filteredHistory, keyword])

  const displayData = keyword ? filteredHistory : groupedChecklistsByDueDate

  useEffect(() => {
    console.log('checklists:', checklists)
  }, [checklists])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <SearchBox value={keyword} onTextChange={setKeyword} />
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      {keyword ? (
        <FlatList
          data={Array.from(displayData)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.checklist_id.toString()}
          renderItem={({ item }) => <SingleHistoryList checklist={item} />}
          ListEmptyComponent={() => <EmptyState />}
        />
      ) : (
        <FlatList
          data={Array.from(displayData)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.dueDate.toString()}
          renderItem={({ item }) => (
            <Pressable
              className="flex-row w-[85vw] justify-between items-center py-2 px-4 bg-gray-50 rounded-lg"
              onPress={() =>
                router.push({
                  pathname: `history/${encodeURIComponent(item.dueDate)}`,
                  params: {
                    checklists: JSON.stringify(item.checklists),
                  },
                })
              }
            >
              <Text className="text-2xl font-semibold py-2">
                {setDateForHistoryTab(item.dueDate)}
              </Text>
              <View>
                <Text className="  text-b-dark-green font-[500] mb-1 ">
                  {item.count === 1
                    ? `${item.count} list checked`
                    : `${item.count} lists checked`}
                </Text>

                {item.totalActions > 0 && (
                  <Text className=" text-b-orange  font-[500] ">
                    {item.totalActions === 1
                      ? `${item.totalActions} action sent`
                      : `${item.totalActions} actions sent`}
                  </Text>
                )}
              </View>
            </Pressable>
          )}
          ListEmptyComponent={() => <EmptyState />}
        />
      )}
    </>
  )
}

export default SupervisorHistoryList
