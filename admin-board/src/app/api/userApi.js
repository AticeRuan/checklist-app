import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
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
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/users',
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    changePassword: builder.mutation({
      query: ({ id, ...passwordData }) => ({
        url: `/users/${id}/change-password`,
        method: 'PATCH',
        body: passwordData,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useAddUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetAllUsersQuery,
} = userApi
