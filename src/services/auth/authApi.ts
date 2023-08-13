import { AuthRegisterResponse, LoginArgs, LoginResponse, RegisterArgs } from './types.ts'

import { baseApi } from '@/services/baseApi.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<AuthRegisterResponse, void>({
        query: () => {
          return {
            url: 'v1/auth/me',
            method: 'GET',
          }
        },
        providesTags: ['Me'],
        extraOptions: {
          maxRetries: 0,
        },
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
        query: args => {
          return {
            url: 'v1/auth/login',
            method: 'POST',
            params: args,
          }
        },
        invalidatesTags: ['Me'],
      }),
      register: builder.mutation<AuthRegisterResponse, RegisterArgs>({
        query: args => {
          return {
            url: 'v1/auth/sign-up',
            method: 'POST',
            body: args,
          }
        },
      }),
      logout: builder.mutation<void, void>({
        query: () => {
          return {
            url: 'v1/auth/logout',
            method: 'POST',
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery, useRegisterMutation, useLogoutMutation } = authApi
