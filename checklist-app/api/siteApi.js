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
      query: () => ({
        url: '/sites',
        headers: {
          'x-custom-url': '/api/sites', // Pass URL here
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllSitesQuery } = siteApi
