import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const checklistApi = createApi({
  reducerPath: 'checklistApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addChecklist: builder.mutation({
      query: (padyload) => ({
        url: `/checklists/create`,
        method: 'POST',
        body: padyload,
      }),
    }),
    getAllChecklistsByUserAndSite: builder.query({
      query: () => '/checklists',
    }),

    getOneChecklist: builder.query({
      query: (id) => `/checklists/${id}`,
    }),
  }),
})

export const {
  useAddChecklistMutation,
  useGetAllChecklistsByUserAndSiteQuery,
  useGetOneChecklistQuery,
} = checklistApi
