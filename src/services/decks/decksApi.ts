import { baseApi } from '@/services/baseApi.ts'
import { CardsResponse } from '@/services/cards'
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
    getCardsOfDeck: builder.query<CardsResponse, GetCardsOfDeckArgs>({
      query: args => {
        const { id, ...params } = args

        return {
          url: `v1/decks/${id}/cards`,
          method: 'GET',
          params: params,
        }
      },
      providesTags: ['Decks'],
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

type GetCardsOfDeckArgs = {
  id: string
  answer?: string
  question?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export const {
  useGetDecksQuery,
  useLazyGetDecksQuery,
  useCreateDeckMutation,
  useGetCardsOfDeckQuery,
} = decksApi
