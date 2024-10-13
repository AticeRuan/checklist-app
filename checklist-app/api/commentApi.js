import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Action'],

  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (comment) => ({
        url: `/add-comment`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (result, error, { action_id }) => [
        { type: 'Action', id: action_id },
      ], // Invalidate specific action by ID
    }),
  }),
})

export const { useAddCommentMutation } = commentApi
