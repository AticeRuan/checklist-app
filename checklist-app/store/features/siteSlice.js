import { createSlice } from '@reduxjs/toolkit'

const initialState = { sites: [] }

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSites(state, action) {
      state.sites = action.payload
    },
  },
})

export const { setSites } = siteSlice.actions

export default siteSlice.reducer
