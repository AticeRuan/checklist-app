import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'

export const commentApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (comment) => ({
        url: `/add-comment`,
        method: 'POST',
        body: comment,
        headers: {
          'x-custom-url': '/api/add-comment',
          'x-custom-body': JSON.stringify(comment),
          'x-custom-method': 'POST',
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'Action', id: result.action_id },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useAddCommentMutation } = commentApi
