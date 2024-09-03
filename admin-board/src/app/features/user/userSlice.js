import { createSlice } from '@reduxjs/toolkit'

const initialState = { users: [] }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload
    },
    deleteUser(state, action) {
      state.users = state.users.filter(
        (user) => user.user_id !== action.payload,
      )
    },
    addUser(state, action) {
      state.users.push(action.payload)
    },
    updateUserRole(state, action) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      )

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload,
        }
      }
    },
  },
})

export const { getUsers, deleteUser, addUser, updateUserRole } =
  userSlice.actions
export default userSlice.reducer
