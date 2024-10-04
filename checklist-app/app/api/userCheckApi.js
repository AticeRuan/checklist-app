import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const userCheckApi = createApi({
  reducerPath: 'userCheckApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    updateCheck: builder.mutation({
      query: ({ id, ...check }) => ({
        url: `/user-checks/${id}`,
        method: 'PATCH',
        body: check,
      }),
    }),
  }),
})

export const { useUpdateCheckMutation } = userCheckApi
