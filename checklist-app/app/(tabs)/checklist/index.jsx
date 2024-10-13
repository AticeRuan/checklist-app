import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { useAddChecklistMutation } from '../../../api/checklistApi'
import { setChecklists } from '../../../store/features/checklistSlice'
import { useEffect, useRef, useState, useCallback } from 'react'
import ListGroup from '../../../components/checklist/ListGroup'
import LoadingScreen from '../../../components/LoadingScreen'
import Header from '../../../components/Header'
import CustomPressable from '../../../components/CustomPressable'
import useRefreshing from '../../../hooks/useRefreshing'
import { useFocusEffect } from 'expo-router'
import useSiteDetails from '../../../hooks/useSiteDetails'

const Checklists = () => {
  //Site details
  const { siteId } = useSiteDetails()
  //user details
  const user = useSelector((state) => state.user.user)
  const users = useSelector((state) => state.user.users)
  const access_level = users?.find((u) => u.name === user)?.access_level
  const userName = users?.find((u) => u.name === user)?.username
  // const [refreshing, setRefreshing] = useState(false)

  const [refreshing, triggerRefresh, stopRefresh] = useRefreshing()

  const dispatch = useDispatch()
  const hasCreatedRef = useRef(false)

  const [addChecklist, { data, error, isLoading }] = useAddChecklistMutation()

  const [nonEvnChecklists, setNonEvnlists] = useState(null)
  const [evnChecklists, setEvnlists] = useState(null)

  const initializeChecklist = async () => {
    try {
      if (hasCreatedRef.current) {
        return
      }

      const payload = {
        site_id: siteId,
        username: userName,
        access_level: access_level,
      }

      const newChecklists = await addChecklist(payload).unwrap()

      if (newChecklists.error) {
        console.error('Failed to add checklist:', newChecklists.error)
        return
      }

      if (newChecklists) {
        dispatch(setChecklists(newChecklists))
        setNonEvnlists(
          newChecklists.filter(
            (checklist) => !checkIsEvnrionmentRelated(checklist),
          ),
        )
        setEvnlists(
          newChecklists.filter((checklist) =>
            checkIsEvnrionmentRelated(checklist),
          ),
        )
      }
    } catch (err) {
      console.error('Failed to add checklist:', err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchChecklist = async () => {
        await initializeChecklist()
      }

      fetchChecklist()
    }, []),
  )

  const checkIsEvnrionmentRelated = (checklist) => {
    const flag = checklist.template.is_environment_related
    if (!flag) {
      return false
    }
    return flag
  }

  const onRefresh = () => {
    triggerRefresh()
  }

  useEffect(() => {
    const fetchChecklist = async () => {
      await initializeChecklist()
      if (refreshing) {
        stopRefresh()
      }
    }

    if (!hasCreatedRef.current || refreshing) {
      fetchChecklist()
    }

    return () => {
      hasCreatedRef.current = true
    }
  }, [refreshing, siteId, userName, access_level, stopRefresh])

  const categories = Array.from(
    new Set(
      [...(nonEvnChecklists || [])]
        .sort(
          (a, b) =>
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
        )
        .map((checklist) => checklist.template.category.name),
    ),
  )
  const getGreeting = () => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      return 'Good Morning'
    } else if (currentHour < 18) {
      return 'Good Afternoon'
    } else {
      return 'Good Evening'
    }
  }

  // useEffect(() => {
  //   console.log('categories', categories)
  //   console.log('userName', userName)
  // }, [userName, categories])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-center flex-1 ">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className="text-white">Failed to load checklist.</Text>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-screen">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 px-[10px] p-[30px]">
        <Text className="w-full text-left mb-10 text-lg">
          {getGreeting()} {userName}!
        </Text>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingx: 10,
            paddingBottom: 100,
          }}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {categories?.map((category) => (
            <ListGroup
              key={category}
              category={category}
              listGroup={nonEvnChecklists.filter(
                (checklist) =>
                  checklist.template.category.name === category &&
                  !checklist.template.is_environment_related,
              )}
            />
          ))}
          {evnChecklists?.length > 0 && (
            <ListGroup
              category="Environment"
              listGroup={evnChecklists}
              isNonEvn={false}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Checklists
