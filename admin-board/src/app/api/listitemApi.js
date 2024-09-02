import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import customBaseQuery from '../customBaseQuery'
export const listitemApi = createApi({
  reducerPath: 'listitemApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    addListItem: builder.mutation({
      query: (newListItem) => ({
        url: '/listitems',
        method: 'POST',
        body: newListItem,
      }),
    }),

    deleteListItem: builder.mutation({
      query: (id) => ({
        url: `/listitems/${id}`,
        method: 'DELETE',
      }),
    }),
    updateListItem: builder.mutation({
      query: ({ id, ...listItem }) => ({
        url: `/list-items/${id}`,
        method: 'PATCH',
        body: listItem,
      }),
    }),
    getOneListItem: builder.query({
      query: (id) => `/listitems/${id}`,
    }),
  }),
})

export const {
  useAddListItemMutation,
  useDeleteListItemMutation,
  useUpdateListItemMutation,
  useGetOneListItemQuery,
} = listitemApi
