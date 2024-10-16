import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from './customBaseQuery'
import { indexApi } from './indexApi'
export const actionApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addAction: builder.mutation({
      query: (action) => ({
        url: `/actions`,
        method: 'POST',
        body: action,
        headers: {
          'x-custom-url': '/api/actions', // Pass URL here
          'x-custom-body': JSON.stringify(action),
          'x-custom-method': 'POST',
        },
      }),
      invalidatesTags: [{ type: 'Action', id: 'LIST' }],
    }),
    getAllActionsBySite: builder.query({
      query: (site_id) => ({
        url: `/actions?site_id=${site_id}`,
        headers: {
          'x-custom-url': `/api/actions?site_id=${site_id}`, // Pass URL here
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ action_id }) => ({
                type: 'Action',
                id: action_id,
              })),
              { type: 'Action', id: 'LIST' },
            ]
          : [{ type: 'Action', id: 'LIST' }],
    }),
    getOneAction: builder.query({
      query: (id) => ({
        url: `/actions/by-id/${id}`,
        headers: {
          'x-custom-url': `/api/actions/by-id/${id}`, // Pass URL here
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Action', id: result.action_id }, 'Action']
          : ['Action'],
    }),
    getActionByUserAndSite: builder.query({
      query: ({ username, site_id }) => ({
        url: `/actions/by-user?username=${username}&site_id=${site_id}`,
        headers: {
          'x-custom-url': `/api/actions/by-user?username=${username}&site_id=${site_id}`,
          'x-custom-body': '',
          'x-custom-method': 'GET',
        },
      }),
      providesTags: (result, error, args) => [{ type: 'Action', id: 'LIST' }],
    }),
    updateAction: builder.mutation({
      query: ({ id, ...action }) => ({
        url: `/actions/${id}`,
        method: 'PATCH',
        body: action,
        headers: {
          'x-custom-url': `/api/actions/${id}`,
          'x-custom-body': JSON.stringify(action),
          'x-custom-method': 'PATCH',
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
    deleteAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}`,
        method: 'DELETE',
        headers: {
          'x-custom-url': `/api/actions/${id}`,
          'x-custom-body': '',
          'x-custom-method': 'DELETE',
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Action', id: 'LIST' }],
    }),
    readAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/read`,
        method: 'PATCH',
        headers: {
          'x-custom-url': `/api/actions/${id}/read`,
          'x-custom-body': '',
          'x-custom-method': 'PATCH',
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
    completeAction: builder.mutation({
      query: (id) => ({
        url: `/actions/${id}/complete`,
        method: 'PATCH',
        headers: {
          'x-custom-url': `/api/actions/${id}/complete`,
          'x-custom-body': '',
          'x-custom-method': 'PATCH',
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Action', id: result?.action_id || id },
        { type: 'Action', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddActionMutation,
  useGetAllActionsBySiteQuery,
  useGetOneActionQuery,
  useGetActionByUserAndSiteQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useReadActionMutation,
  useCompleteActionMutation,
} = actionApi
