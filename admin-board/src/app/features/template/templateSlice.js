import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  templates: [],
}

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    getTemplates(state, action) {
      state.templates = action.payload
    },
    deleteTemplate(state, action) {
      state.templates = state.templates.filter(
        (template) => template.id !== action.payload.id,
      )
    },
    addTemplate(state, action) {
      state.templates.push(action.payload)
    },
    updateTemplate(state, action) {
      const index = state.templates.findIndex(
        (template) => template.template_id === action.payload.template_id,
      )

      if (index !== -1) {
        state.templates[index] = {
          ...state.templates[index],
          ...action.payload,
        }
      }
    },
  },
})

export const { getTemplates, deleteTemplate, addTemplate, updateTemplate } =
  templateSlice.actions

export default templateSlice.reducer
