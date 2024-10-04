import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (comment) => ({
        url: `/comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (result, error, { comment }) => [
        { type: 'action', id: comment.action_id },
      ], // Invalidate specific action by ID
    }),
  }),
})

export const { useAddCommentMutation } = commentApi
