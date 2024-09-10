import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
  },
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.category_id === action.payload.id,
      )

      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        }
      }
    },

    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.category_id !== action.payload,
      )
    },
  },
})

export const { getCategories, addCategory, updateCategory, deleteCategory } =
  categorySlice.actions

export default categorySlice.reducer
