import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'

export const ipAddressApi = createApi({
  reducerPath: 'ipAddressApi',
  baseQuery: customBaseQuery,
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
