// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const indexApi = createApi({
  reducerPath: 'indexApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Action', 'UserCheck', 'Checklist'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
