import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'

export const checklistApi = createApi({
  reducerPath: 'checklistApi',
  baseQuery: customBaseQuery,
  tagTypes: ['checklist'],

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
    }),
  }),
})

export const {
  useAddChecklistMutation,
  useGetAllChecklistsByUserAndSiteQuery,
  useGetOneChecklistQuery,
  useUpdateMachineIdMutation,
} = checklistApi
