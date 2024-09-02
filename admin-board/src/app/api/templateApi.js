import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: customBaseQuery,

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
