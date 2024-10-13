import { createSlice } from '@reduxjs/toolkit'

const initialState = { userChecks: [] }

const userCheckSlice = createSlice({
  name: 'userCheck',
  initialState,
  reducers: {
    setUserChecks(state, action) {
      if (action.payload.length === 0) {
        console.log('Warning: userChecks is being set to an empty array')
      }
      state.userChecks = action.payload
    },
    updateUserCheck(state, action) {
      const index = state.userChecks.findIndex(
        (userCheck) => userCheck.user_check_id === action.payload.user_check_id,
      )

      if (index !== -1) {
        state.userChecks[index] = {
          ...state.userChecks[index],
          ...action.payload,
        }
      }
    },
  },
})

export const { setUserChecks, updateUserCheck } = userCheckSlice.actions

export default userCheckSlice.reducer
