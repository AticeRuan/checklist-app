import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const actionApi = createApi({
  reducerPath: 'actionApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addAction: builder.mutation({
      query: (action) => ({
        url: `/actions`,
        method: 'POST',
        body: action,
      }),
    }),
    getAllActions: builder.query({
      query: () => '/actions',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'action', id })), 'action']
          : ['action'],
    }),

    getOneAction: builder.query({
      query: (id) => `/actions/${id}`,
    }),
    updateAction: builder.mutation({
      query: ({ id, ...action }) => ({
        url: `/actions/${id}`,
        method: 'PATCH',
        body: action,
      }),
    }),
    deleteAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}`,
        method: 'DELETE',
      }),
    }),
    readAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/read`,
        method: 'PATCH',
      }),
    }),
    completeAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/complete`,
        method: 'PATCH',
      }),
    }),
  }),
})

export const {
  useAddActionMutation,
  useGetAllActionsQuery,
  useGetOneActionQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useReadActionMutation,
  useCompleteActionMutation,
} = actionApi
