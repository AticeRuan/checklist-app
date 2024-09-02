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
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    addUser(state, action) {
      state.users.push(action.payload)
    },
  },
})

export const { getUsers, deleteUser, addUser } = userSlice.actions
export default userSlice.reducer
