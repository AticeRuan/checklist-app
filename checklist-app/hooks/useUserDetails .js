import { useSelector } from 'react-redux'

const useUserDetails = () => {
  // Get user and users array from Redux state
  const user = useSelector((state) => state.user.user)
  const users = useSelector((state) => state.user.users)

  // Find the user details based on the name
  const selectedUser = users.find((u) => u.name === user)

  // Destructure username and access_level
  const username = selectedUser?.username
  const access_level = selectedUser?.access_level

  return { username, access_level, user, users }
}

export default useUserDetails
