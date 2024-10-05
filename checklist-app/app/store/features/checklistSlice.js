import { createSlice } from '@reduxjs/toolkit'

const initialState = { checklists: [] }

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setChecklists(state, action) {
      state.checklists = action.payload
    },
  },
})
export const { setChecklists } = checklistSlice.actions
export default checklistSlice.reducer
