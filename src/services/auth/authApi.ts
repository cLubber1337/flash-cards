import { baseApi } from '@/services/baseApi.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<any, void>({
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
      register: builder.mutation<RegisterResponse, RegisterArgs>({
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
    }
  },
})

export type LoginResponse = {
  accessToken: string
}
export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterArgs = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}

export type RegisterResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export const { useLoginMutation, useMeQuery, useRegisterMutation, useLogoutMutation } = authApi
