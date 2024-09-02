import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
export const siteApi = createApi({
  reducerPath: 'siteApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addSite: builder.mutation({
      query: (newSite) => ({
        url: '/sites',
        method: 'POST',
        body: newSite,
      }),
    }),
    getAllSites: builder.query({
      query: () => '/sites',
    }),
    deleteSite: builder.mutation({
      query: (id) => ({
        url: `/sites/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSite: builder.mutation({
      query: ({ id, ...site }) => ({
        url: `/sites/${id}`,
        method: 'PATCH',
        body: site,
      }),
    }),
    getOneSite: builder.query({
      query: (id) => `/sites/${id}`,
    }),
  }),
})

export const {
  useAddSiteMutation,
  useGetAllSitesQuery,
  useDeleteSiteMutation,
  useUpdateSiteMutation,
  useGetOneSiteQuery,
} = siteApi
