import {
  CreateDeckArgs,
  CreateDeckResponse,
  DecksResponse,
  GetCardsOfDeckArgs,
  GetDecksArgs,
} from './types.ts'

import { baseApi } from '@/services/baseApi.ts'
import { CardsResponse } from '@/services/cards'

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
    createDeck: builder.mutation<CreateDeckResponse, CreateDeckArgs>({
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
      providesTags: ['Cards'],
    }),
  }),
})

export const { useGetDecksQuery, useGetCardsOfDeckQuery } = decksApi
