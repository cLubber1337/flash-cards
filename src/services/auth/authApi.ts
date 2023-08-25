import {
  AuthRegisterResponse,
  LoginArgs,
  LoginResponse,
  RecoveryResponse,
  RegisterArgs,
} from './types.ts'

import { baseApi } from '@/services/baseApi.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<AuthRegisterResponse | null, void>({
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
          localStorage.clear()

          return {
            url: 'v1/auth/logout',
            method: 'POST',
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('me', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },

        invalidatesTags: ['Me'],
      }),
      passwordRecovery: builder.mutation<RecoveryResponse, string>({
        query: email => {
          return {
            url: 'v1/auth/recover-password',
            method: 'POST',
            body: {
              email,
              html:
                '<h1>Hi, ##name##</h1>' +
                '<p>Click <a href="https://flash-cards-pro.vercel.app/reset-password/##token##">here</a> to recover your password</p>',
              subject: 'Password recovery',
            },
          }
        },
      }),
      resetPassword: builder.mutation<any, { token: string; password: string }>({
        query: ({ token, password }) => ({
          url: `v1/auth/reset-password/${token}`,
          method: 'POST',
          body: { password },
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useMeQuery,
  useRegisterMutation,
  useLogoutMutation,
  usePasswordRecoveryMutation,
  useResetPasswordMutation,
} = authApi
