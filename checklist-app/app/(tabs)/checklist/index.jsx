import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { useAddChecklistMutation } from '../../../api/checklistApi'
import { setChecklists } from '../../../store/features/checklistSlice'
import { useEffect, useRef, useState } from 'react'

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

  const [checklists, setlists] = useState(null)

  const checkIsMachineRelated = (checklist) => {
    const flag = checklist.template.is_machine_related
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
          console.error('Failed to add checklist:', newChecklist.error)
          return
        }

        if (newChecklists) {
          dispatch(setChecklists(newChecklists))
          setlists(newChecklists)
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

  const categories = new Set(
    [...(checklists || [])] // Create a shallow copy of the array
      .sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
      )
      .map((checklist) => checklist.template.category.name), //
  )

  useEffect(() => {
    console.log('checklists', checklists)
    console.log('userName', userName)
  }, [userName, access_level])

  return (
    <SafeAreaView className="bg-b-mid-blue w-screen items-center justify-start h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="items-center justify-start  bg-white w-screen  rounded-t-[48px] py-[40%]  min-h-full">
          <Text>Checklists</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Checklists
