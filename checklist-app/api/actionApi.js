import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const actionApi = createApi({
  reducerPath: 'actionApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Action'], // Define tag types here

  endpoints: (builder) => ({
    addAction: builder.mutation({
      query: (action) => ({
        url: `/actions`,
        method: 'POST',
        body: action,
      }),
      invalidatesTags: [
        { type: 'Action', id: 'LIST' },
        { type: 'Action', id: 'USER' },
      ],
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
      providesTags: (result, error, { action_id }) => [
        { type: 'Action', id: action_id },
      ],
    }),
    getActionByUser: builder.query({
      query: (user) => `/actions/by-user?user=${user}`,
      providesTags: (result, error, user) => [{ type: 'Action', id: user }],
    }),
    updateAction: builder.mutation({
      query: ({ id, ...action }) => ({
        url: `/actions/${id}`,
        method: 'PATCH',
        body: action,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id },
        { type: 'Action', id: 'LIST' },
        { type: 'Action', id: 'USER' },
      ],
    }),
    deleteAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Action', id },
        { type: 'Action', id: 'LIST' },
        { type: 'Action', id: 'USER' },
      ],
    }),
    readAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Action', id },
        { type: 'Action', id: 'LIST' },
        { type: 'Action', id: 'USER' },
      ],
    }),
    completeAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Action', id },
        { type: 'Action', id: 'LIST' },
        { type: 'Action', id: 'USER' },
      ],
    }),
  }),
})

export const {
  useAddActionMutation,
  useGetAllActionsBySiteQuery,
  useGetOneActionQuery,
  useGetActionByUserQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useReadActionMutation,
  useCompleteActionMutation,
} = actionApi
