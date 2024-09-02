import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
    }),
    getAllCategories: builder.query({
      query: () => '/categories',
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: category,
      }),
    }),
    getOneCategory: builder.query({
      query: (id) => `/categories/${id}`,
    }),
  }),
})

export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetOneCategoryQuery,
} = categoryApi
