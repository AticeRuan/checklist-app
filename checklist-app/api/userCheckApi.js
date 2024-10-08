import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const userCheckApi = createApi({
  reducerPath: 'userCheckApi',
  baseQuery: customBaseQuery,
  tagTypes: ['checklist'],

  endpoints: (builder) => ({
    updateCheck: builder.mutation({
      query: ({ id, ...check }) => ({
        url: `/user-checks/${id}`,
        method: 'PATCH',
        body: check,
      }),
      invalidatesTags: (result, error, { checklist_id }) => [
        { type: 'checklist', id: checklist_id },
      ],
    }),
  }),
})

export const { useUpdateCheckMutation } = userCheckApi
