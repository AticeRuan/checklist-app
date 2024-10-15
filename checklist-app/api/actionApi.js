import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'
export const actionApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addAction: builder.mutation({
      query: (action) => ({
        url: `/actions`,
        method: 'POST',
        body: action,
      }),
      invalidatesTags: [{ type: 'Action', id: 'LIST' }],
    }),
    getAllActionsBySite: builder.query({
      query: (site_id) => `/actions?site_id=${site_id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ action_id }) => ({
                type: 'Action',
                id: action_id,
              })),
              { type: 'Action', id: 'LIST' },
            ]
          : [{ type: 'Action', id: 'LIST' }],
    }),
    getOneAction: builder.query({
      query: (id) => `/actions/by-id/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: 'Action', id: result.action_id }, 'Action']
          : ['Action'],
    }),
    getActionByUserAndSite: builder.query({
      query: ({ username, site_id }) => {
        console.log('Logging username in API slice:', username)
        console.log('Logging site_id in API slice:', site_id)
        return `/actions/by-user?username=${username}&site_id=${site_id}`
      },
      providesTags: (result, error, args) => [{ type: 'Action', id: 'LIST' }],
    }),
    updateAction: builder.mutation({
      query: ({ id, ...action }) => ({
        url: `/actions/${id}`,
        method: 'PATCH',
        body: action,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
    deleteAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Action', id: 'LIST' }],
    }),
    readAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
    completeAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddActionMutation,
  useGetAllActionsBySiteQuery,
  useGetOneActionQuery,
  useGetActionByUserAndSiteQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useReadActionMutation,
  useCompleteActionMutation,
} = actionApi
