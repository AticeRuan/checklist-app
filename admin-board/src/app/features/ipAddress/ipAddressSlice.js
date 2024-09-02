import { createSlice } from '@reduxjs/toolkit'

const initialState = { ipAddresses: [] }

const ipAddressSlice = createSlice({
  name: 'ipAddress',
  initialState,
  reducers: {
    getIpAddresses(state, action) {
      state.ipAddresses = action.payload
    },
    deleteIpAddress(state, action) {
      state.ipAddresses = state.ipAddresses.filter(
        (ipAddress) => ipAddress.ip_address_id !== action.payload,
      )
    },
    addIpAddress(state, action) {
      state.ipAddresses.push(action.payload)
    },
    updateIpAddress(state, action) {
      const index = state.ipAddresses.findIndex(
        (ipAddress) => ipAddress.ip_address_id === action.payload.id,
      )

      if (index !== -1) {
        state.ipAddresses[index] = {
          ...state.ipAddresses[index],
          ...action.payload,
        }
      }
    },
  },
})

export const {
  getIpAddresses,
  deleteIpAddress,
  addIpAddress,
  updateIpAddress,
} = ipAddressSlice.actions

export default ipAddressSlice.reducer
