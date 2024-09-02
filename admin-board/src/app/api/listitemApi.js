import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const listitemApi = createApi({
  reducerPath: 'listitemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
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
