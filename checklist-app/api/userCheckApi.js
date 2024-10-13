import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const userCheckApi = createApi({
  reducerPath: 'userCheckApi',
  baseQuery: customBaseQuery,
  tagTypes: ['UserCheck'],
  endpoints: (builder) => ({
    updateCheck: builder.mutation({
      query: ({ id, ...check }) => ({
        url: `/user-checks/${id}`,
        method: 'PATCH',
        body: check,
      }),
      invalidatesTags: ['UserCheck'],
    }),
    getUserChecksByChecklist: builder.query({
      query: (checklist_id) => `user-checks?checklist_id=${checklist_id}`,
      providesTags: ['UserCheck'],
    }),
  }),
})

export const { useUpdateCheckMutation, useGetUserChecksByChecklistQuery } =
  userCheckApi
