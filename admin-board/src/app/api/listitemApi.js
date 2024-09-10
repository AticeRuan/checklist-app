import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
export const listitemApi = createApi({
  reducerPath: 'listitemApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addListItem: builder.mutation({
      query: (newListItem) => ({
        url: '/list-items',
        method: 'POST',
        body: newListItem,
      }),
      invalidatesTags: ['ListItemList'],
    }),
    deleteListItem: builder.mutation({
      query: (id) => ({
        url: `/list-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ListItemList'],
    }),
    updateListItem: builder.mutation({
      query: ({ id, ...listItem }) => ({
        url: `/list-items/${id}`,
        method: 'PATCH',
        body: listItem,
      }),
      invalidatesTags: ['ListItemList'],
    }),
    getOneListItem: builder.query({
      query: (id) => `/list-items/${id}`,
      providesTags: ['ListItemList'],
    }),
    getListItemsByTemplateId: builder.query({
      query: (templateId) => `/list-items/by-template/${templateId}`,
      providesTags: ['ListItemList'],
    }),
  }),
})

export const {
  useAddListItemMutation,
  useDeleteListItemMutation,
  useUpdateListItemMutation,
  useGetOneListItemQuery,
  useGetListItemsByTemplateIdQuery,
} = listitemApi
