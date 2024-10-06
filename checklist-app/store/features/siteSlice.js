import { createSlice } from '@reduxjs/toolkit'

const initialState = { sites: [], singleSite: null }

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setSites(state, action) {
      state.sites = action.payload
    },
    setSingleSite(state, action) {
      state.singleSite = action.payload
    },
  },
})

export const { setSites, setSingleSite } = siteSlice.actions

export default siteSlice.reducer
