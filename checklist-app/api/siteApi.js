import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
export const siteApi = createApi({
  reducerPath: 'siteApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    getAllSites: builder.query({
      query: () => '/sites',
    }),
  }),
})

export const { useGetAllSitesQuery } = siteApi
