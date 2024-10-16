import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'

export const userCheckApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCheck: builder.mutation({
      query: ({ id, ...check }) => ({
        url: `/user-checks/${id}`,
        method: 'PATCH',
        body: check,
        headers: {
          'x-custom-url': '/api/user-checks/${id}',
          'x-custom-body': JSON.stringify(check),
          'x-custom-method': 'PATCH',
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'UserCheck' },
        { type: 'Checklist', id: args.checklist_id },
      ],
    }),
    getUserChecksByChecklist: builder.query({
      query: (checklist_id) => ({
        url: `user-checks?checklist_id=${checklist_id}`,
        headers: {
          'x-custom-url': `/api/user-checks?checklist_id=${checklist_id}`,
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
      providesTags: ['UserCheck'],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateCheckMutation, useGetUserChecksByChecklistQuery } =
  userCheckApi
