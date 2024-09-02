import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ipAddressApi = createApi({
  reducerPath: 'ipAddressApi',
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
    addIpAddress: builder.mutation({
      query: (newIpAddress) => ({
        url: '/ip-addresses',
        method: 'POST',
        body: newIpAddress,
      }),
    }),
    getAllIpAddresses: builder.query({
      query: () => '/ip-addresses',
    }),
    deleteIpAddress: builder.mutation({
      query: (id) => ({
        url: `/ip-addresses/${id}`,
        method: 'DELETE',
      }),
    }),
    updateIpAddress: builder.mutation({
      query: ({ id, ...ipAddress }) => ({
        url: `/ip-addresses/${id}`,
        method: 'PATCH',
        body: ipAddress,
      }),
    }),
    getOneIpAddress: builder.query({
      query: (id) => `/ip-addresses/${id}`,
    }),
  }),
})

export const {
  useAddIpAddressMutation,
  useGetAllIpAddressesQuery,
  useDeleteIpAddressMutation,
  useUpdateIpAddressMutation,
  useGetOneIpAddressQuery,
} = ipAddressApi
