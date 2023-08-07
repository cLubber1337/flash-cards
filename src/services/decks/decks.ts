import { baseApi } from '@/services/baseApi.ts'
import { DecksResponse } from '@/services/decks/types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, GetDecksArgs>({
      query: args => {
        return {
          url: 'v1/decks',
          method: 'GET',
          params: args,
        }
      },
      providesTags: ['Decks'],
    }),
    createDeck: builder.mutation<any, any>({
      query: ({ name }) => {
        return {
          url: 'v1/decks',
          method: 'POST',
          body: { name },
        }
      },
      invalidatesTags: ['Decks'],
    }),
  }),
})

type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}
export const { useGetDecksQuery, useLazyGetDecksQuery, useCreateDeckMutation } = decksApi
