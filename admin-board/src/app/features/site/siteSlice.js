import { createSlice } from '@reduxjs/toolkit'

const initialState = { sites: [] }

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    getSites(state, action) {
      state.sites = action.payload
    },
    deleteSite(state, action) {
      state.sites = state.sites.filter(
        (site) => site.site_id !== action.payload,
      )
    },
    addSite(state, action) {
      state.sites.push(action.payload)
    },
    updateSite(state, action) {
      const index = state.sites.findIndex(
        (site) => site.site_id === action.payload.id,
      )

      if (index !== -1) {
        state.sites[index] = {
          ...state.sites[index],
          ...action.payload,
        }
      }
    },
  },
})

export const { getSites, deleteSite, addSite, updateSite } = siteSlice.actions

export default siteSlice.reducer
