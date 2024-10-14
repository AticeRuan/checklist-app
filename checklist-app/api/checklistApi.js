import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'

export const checklistApi = indexApi.injectEndpoints({
  // reducerPath: 'checklistApi',
  // baseQuery: customBaseQuery,
  // tagTypes: ['checklist'],

  endpoints: (builder) => ({
    addChecklist: builder.mutation({
      query: (payload) => ({
        url: `/checklists/create`,
        method: 'POST',
        body: payload,
      }),

      invalidatesTags: [{ type: 'Checklist', id: 'LIST' }],
    }),

    getAllChecklistsByUserAndSite: builder.query({
      query: ({ username, site_id }) => ({
        url: `/checklists?username=${username}&site_id=${site_id}`,
        method: 'GET',
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ checklist_id }) => ({
                type: 'Checklist',
                id: checklist_id,
              })),
              { type: 'Checklist', id: 'LIST' },
            ]
          : [{ type: 'Checklist', id: 'LIST' }],
    }),
    getAllChecklistBySite: builder.query({
      query: (site_id) => ({
        url: `checklists/by-site?site_id=${site_id}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ checklist_id }) => ({
                type: 'Checklist',
                id: checklist_id,
              })),
              { type: 'Checklist', id: 'LIST' },
            ]
          : [{ type: 'Checklist', id: 'LIST' }],
    }),
    getOneChecklist: builder.query({
      query: (id) => `/checklists/${id}`,
      transformResponse: (response) => response,
      providesTags: (result) =>
        result
          ? [{ type: 'Checklist', id: result.checklist_id }, 'Checklist']
          : ['Checklist'],
    }),

    updateMachineId: builder.mutation({
      query: ({ id, machine_id }) => ({
        url: `/checklists/${id}`,
        method: 'PATCH',
        body: { machine_id },
      }),

      invalidatesTags: (result, error, args) => [
        { type: 'Checklist', id: result.checklist_id },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddChecklistMutation,
  useGetAllChecklistsByUserAndSiteQuery,
  useGetOneChecklistQuery,
  useUpdateMachineIdMutation,
} = checklistApi
