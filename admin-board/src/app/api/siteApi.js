import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const siteApi = createApi({
  reducerPath: 'siteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

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
