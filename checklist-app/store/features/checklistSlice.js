import { createSlice } from '@reduxjs/toolkit'

const initialState = { checklists: [], checklist: null }

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
    setSingleChecklist(state, action) {
      state.checklist = action.payload
    },
    updateSingleChecklist(state, action) {
      state.checklist = {
        ...state.checklist,
        ...action.payload,
      }
    },
  },
})
export const {
  setChecklists,
  updateChecklist,
  setSingleChecklist,
  updateSingleChecklist,
} = checklistSlice.actions
export default checklistSlice.reducer
