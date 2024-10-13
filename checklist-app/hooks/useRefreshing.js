import { useState, useCallback } from 'react'

const useRefreshing = () => {
  const [refreshing, setRefreshing] = useState(false)

  const triggerRefresh = () => {
    setRefreshing(true)
  }
  const stopRefresh = useCallback(() => {
    setRefreshing(false)
  }, [])

  return [refreshing, triggerRefresh, stopRefresh]
}

export default useRefreshing
