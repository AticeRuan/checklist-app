import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { useAddChecklistMutation } from '../../../api/checklistApi'
import { setChecklists } from '../../../store/features/checklistSlice'
import { useEffect, useRef, useState } from 'react'
import ListGroup from '../../../components/checklist/ListGroup'
import LoadingScreen from '../../../components/LoadingScreen'
import Header from '../../../components/Header'

const Checklists = () => {
  const localSites = useSelector((state) => state.site.sites)
  const selectedSite = useSelector((state) => state.site.singleSite)
  //user details
  const user = useSelector((state) => state.user.user)
  const users = useSelector((state) => state.user.users)
  const access_level = users?.find((u) => u.name === user)?.access_level
  const userName = users?.find((u) => u.name === user)?.username

  const siteId = localSites?.find(
    (site) => site.site_name === selectedSite,
  )?.site_id

  const dispatch = useDispatch()
  const hasCreatedRef = useRef(false)

  const [addChecklist, { data, error, isLoading }] = useAddChecklistMutation()

  const [nonEvnChecklists, setNonEvnlists] = useState(null)
  const [evnChecklists, setEvnlists] = useState(null)

  const checkIsMachineRelated = (checklist) => {
    const flag = checklist.template.is_machine_related
    if (!flag) {
      return false
    }
    return flag
  }

  const checkIsEvnrionmentRelated = (checklist) => {
    const flag = checklist.template.is_environment_related
    if (!flag) {
      return false
    }
    return flag
  }

  useEffect(() => {
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
    initializeChecklist()
    return () => {
      hasCreatedRef.current = true
    }
  }, [data])

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

  useEffect(() => {
    console.log('categories', categories)
    console.log('userName', userName)
  }, [userName, categories])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-screen">
      <Header />

      <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px]   flex-1 px-[10px] p-[30px]">
        <Text className="w-full text-left mb-10 text-lg">
          {getGreeting()} {userName}!
        </Text>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
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
