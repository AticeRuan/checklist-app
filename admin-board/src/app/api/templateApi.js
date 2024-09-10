import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../customBaseQuery'
export const templateApi = createApi({
  reducerPath: 'templateApi',
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    addTemplate: builder.mutation({
      query: () => ({
        url: '/templates',
        method: 'POST',
      }),
      invalidatesTags: ['TemplateList'],
    }),
    getAllTemplates: builder.query({
      query: () => '/templates',
      providesTags: ['TemplateList'],
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TemplateList'],
    }),
    updateTemplate: builder.mutation({
      query: ({ id, ...template }) => ({
        url: `/templates/${id}`,
        method: 'PATCH',
        body: template,
      }),
      invalidatesTags: ['TemplateList'],
    }),
    getOneTemplate: builder.query({
      query: (id) => `/templates/${id}`,
      providesTags: ['TemplateList'],
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
