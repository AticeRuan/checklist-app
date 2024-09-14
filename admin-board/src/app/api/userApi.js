import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REHYDRATE } from 'redux-persist'
import customBaseQuery from '../customBaseQuery'

function isHydrateAction(action) {
  return action.type === REHYDRATE
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  // // to prevent circular type issues, the return type needs to be annotated as any
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (isHydrateAction(action)) {
  //     // when persisting the api reducer
  //     if (action.key === 'root') {
  //       return action.payload
  //     }

  //     // When persisting the root reducer
  //     return action.payload[userApi.reducerPath]
  //   }
  // },
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users/add-new-user',
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
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: user,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: `/users/change-password`,
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
      transformResponse: (response) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('refreshToken', response.refreshToken)
        return response
      },
    }),
    logoutUser: builder.mutation({
      query: (refreshToken) => ({
        url: '/users/logout',
        method: 'POST',
        body: { refreshToken },
      }),
      transformResponse: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      },
    }),
    resetPassword: builder.mutation({
      query: (id) => ({
        url: `/users/reset-password/${id}`,
        method: 'PATCH',
        body: JSON.stringify({ user_id: id }),
      }),
    }),
    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('Refresh token not found in local storage')
        }
        return {
          url: '/users/refresh-token',
          method: 'POST',
          body: { refreshToken },
        }
      },
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token)
        } else {
          throw new Error('Failed to refresh token')
        }
        return response
      },
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
  useUpdateUserMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = userApi
