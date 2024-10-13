import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const checklistApi = createApi({
  reducerPath: 'checklistApi',
  baseQuery: customBaseQuery,
  tagTypes: ['checklist'],

  endpoints: (builder) => ({
    addChecklist: builder.mutation({
      query: (payload) => ({
        url: `/checklists/create`,
        method: 'POST',
        body: payload,
      }),
      // Invalidate 'checklist' to ensure fresh data
      invalidatesTags: ['checklist'],
    }),

    getAllChecklistsByUserAndSite: builder.query({
      query: () => '/checklists',
      // Invalidate cache if needed for this endpoint
      providesTags: ['checklist'],
    }),

    getOneChecklist: builder.query({
      query: (id) => `/checklists/${id}`,
      transformResponse: (response) => response,
      providesTags: (result) =>
        result
          ? [{ type: 'checklist', id: result.checklist_id }, 'checklist']
          : ['checklist'],
    }),

    updateMachineId: builder.mutation({
      query: ({ id, machine_id }) => ({
        url: `/checklists/${id}`,
        method: 'PATCH',
        body: { machine_id },
      }),
      // Invalidate to refresh the checklist after update
      invalidatesTags: (result, error, { id }) => [{ type: 'checklist', id }],
    }),
  }),
})

export const {
  useAddChecklistMutation,
  useGetAllChecklistsByUserAndSiteQuery,
  useGetOneChecklistQuery,
  useUpdateMachineIdMutation,
} = checklistApi
