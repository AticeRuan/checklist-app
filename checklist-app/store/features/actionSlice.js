import { createSlice } from '@reduxjs/toolkit'

const initialState = { flags: [] }

const actionSlice = createSlice({
  name: 'flag',
  initialState,
  reducers: {
    setActions(state, action) {
      state.flags = action.payload
    },
    addAction(state, action) {
      state.flags.push(action.payload)
    },
    updateAction(state, action) {
      const index = state.flags.findIndex(
        (flag) => flag.action_id === action.payload.action_id,
      )
      if (index !== -1) {
        state.flags[index] = {
          ...state.flags[index],
          ...action.payload,
        }
      }
    },
    deleteAction(state, action) {
      state.flags = state.flags.filter(
        (flag) => flag.action_id !== action.payload,
      )
    },
  },
})

export const { setActions, addAction, updateAction, deleteAction } =
  actionSlice.actions
export default actionSlice.reducer
