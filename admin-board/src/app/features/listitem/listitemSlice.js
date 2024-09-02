import { createSlice } from '@reduxjs/toolkit'

const initialState = { listitems: [] }

const listitemSlice = createSlice({
  name: 'listitem',
  initialState,
  reducers: {
    getListitems(state, action) {
      state.listitems = action.payload
    },
    deleteListitem(state, action) {
      state.listitems = state.listitems.filter(
        (listitem) => listitem.listitem_id !== action.payload,
      )
    },
    addListitem(state, action) {
      state.listitems.push(action.payload)
    },
    updateListitem(state, action) {
      const index = state.listitems.findIndex(
        (listitem) => listitem.listitem_id === action.payload.id,
      )

      if (index !== -1) {
        state.listitems[index] = {
          ...state.listitems[index],
          ...action.payload,
        }
      }
    },
  },
})

export const { getListitems, deleteListitem, addListitem, updateListitem } =
  listitemSlice.actions

export default listitemSlice.reducer
