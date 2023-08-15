import { AuthRegisterResponse } from '@/services/auth'
import { baseApi } from '@/services/baseApi.ts'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      changeUserName: builder.mutation<AuthRegisterResponse, { name: string }>({
        query: args => {
          return {
            url: 'v1/auth/me',
            method: 'PATCH',
            body: args,
          }
        },
        invalidatesTags: ['Me'],
      }),
      updatePhoto: builder.mutation<AuthRegisterResponse, FormData>({
        query: avatar => {
          return {
            url: 'v1/auth/me',
            method: 'PATCH',
            body: avatar,
            formData: true,
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useChangeUserNameMutation, useUpdatePhotoMutation } = profileApi
