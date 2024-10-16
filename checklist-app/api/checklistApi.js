import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'

export const checklistApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addChecklist: builder.mutation({
      query: (payload) => ({
        url: `/checklists/create`,
        method: 'POST',
        body: payload,
        headers: {
          'x-custom-url': '/api/checklists/create', // Pass URL here
          'x-custom-body': JSON.stringify(payload),
          'x-custom-method': 'POST',
        },
      }),

      invalidatesTags: [{ type: 'Checklist', id: 'LIST' }],
    }),

    getAllChecklistsByUserAndSite: builder.query({
      query: ({ username, site_id }) => ({
        url: `/checklists?username=${username}&site_id=${site_id}`,

        headers: {
          'x-custom-url': `/api/checklists?username=${username}&site_id=${site_id}`,
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
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
        url: `/checklists/by-site/${site_id}`,
        headers: {
          'x-custom-url': `/api/checklists/by-site/${site_id}`, // Pass URL here
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
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
      query: (id) => ({
        url: `/checklists/${id}`,
        headers: {
          'x-custom-url': `/api/checklists/${id}`, // Pass URL here
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
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
        headers: {
          'x-custom-url': `/api/checklists/${id}`,
          'x-custom-body': JSON.stringify({ machine_id }),
          'x-custom-method': 'PATCH',
        },
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
  useGetAllChecklistBySiteQuery,
} = checklistApi
