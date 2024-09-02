import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const templateApi = createApi({
  reducerPath: 'templateApi',
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
    addTemplate: builder.mutation({
      query: (newTemplate) => ({
        url: '/templates',
        method: 'POST',
        body: newTemplate,
      }),
    }),
    getAllTemplates: builder.query({
      query: () => '/templates',
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTemplate: builder.mutation({
      query: ({ id, ...template }) => ({
        url: `/templates/${id}`,
        method: 'PATCH',
        body: template,
      }),
    }),
    getOneTemplate: builder.query({
      query: (id) => `/templates/${id}`,
    }),
  }),
})

export const {
  useAddTemplateMutation,
  useGetAllTemplatesQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
  useGetOneTemplateQuery,
} = templateApi
