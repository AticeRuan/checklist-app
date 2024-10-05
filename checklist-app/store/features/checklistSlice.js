import { createSlice } from '@reduxjs/toolkit'

const initialState = { checklists: [] }

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setChecklists(state, action) {
      state.checklists = action.payload
    },
    updateChecklist(state, action) {
      const index = state.checklists.findIndex(
        (checklist) => checklist.id === action.payload.checklist_id,
      )

      if (index !== -1) {
        state.checklists[index] = {
          ...state.checklists[index],
          ...action.payload,
        }
      }
    },
  },
})
export const { setChecklists } = checklistSlice.actions
export default checklistSlice.reducer
