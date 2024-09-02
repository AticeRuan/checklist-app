import { createSlice } from '@reduxjs/toolkit'

const initailState = { user: JSON.parse(localStorage.getItem('user')) || null }

const authSlice = createSlice({
  name: 'auth',
  initialState: initailState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    changePassword(state, action) {
      state.user.password = action.payload
    },
  },
})

export const { login, logout, changePassword } = authSlice.actions

export default authSlice.reducer
