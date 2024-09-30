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

        return response
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      transformResponse: () => {
        localStorage.removeItem('token')
      },
    }),
    resetPassword: builder.mutation({
      query: (id) => ({
        url: `/users/reset-password/${id}`,
        method: 'PATCH',
        body: JSON.stringify({ user_id: id }),
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
  useUpdateUserMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = userApi
