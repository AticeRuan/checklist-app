import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'
// export const siteApi = createApi({
//   reducerPath: 'siteApi',
//   baseQuery: customBaseQuery,

//   endpoints: (builder) => ({
//     getAllSites: builder.query({
//       query: () => '/sites',
//     }),
//   }),
// })

export const siteApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSites: builder.query({
      query: () => '/sites',
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllSitesQuery } = siteApi
