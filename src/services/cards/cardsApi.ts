import { baseApi } from '../baseApi.ts'

import { CardResponse, CardsResponse } from './types.ts'

import { GetCardsOfDeckArgs } from '@/services/decks/types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
    createCard: builder.mutation<CardResponse, { id: string; formData: FormData }>({
      query: args => {
        return {
          url: `v1/decks/${args.id}/cards`,
          method: 'POST',
          body: args.formData,
        }
      },
      invalidatesTags: ['Cards'],
    }),
    getCard: builder.query<CardResponse, { id: string }>({
      query: ({ id }) => {
        return {
          url: `v1/cards/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['Card'],
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Cards', 'Card'],
    }),
    updateCard: builder.mutation<CardResponse, { id: string; formData: FormData }>({
      query: args => {
        return {
          url: `v1/cards/${args.id}`,
          method: 'PATCH',
          body: args.formData,
        }
      },
      invalidatesTags: ['Cards', 'Card'],
    }),
    getRandomCard: builder.query<CardResponse, { id: string; previousCardId?: string }>({
      query: ({ id, previousCardId }) => {
        return {
          url: `v1/decks/${id}/learn`,
          method: 'GET',
          params: {
            previousCardId,
          },
        }
      },
      providesTags: ['Learn'],
    }),
    rateCard: builder.mutation<{}, { deckId: string; grade: number; cardId: string }>({
      query: ({ deckId, cardId, grade }) => {
        return {
          url: `v1/decks/${deckId}/learn`,
          method: 'POST',
          body: {
            cardId,
            grade,
          },
        }
      },
      invalidatesTags: ['Learn', 'Cards'],
    }),
  }),
})

export const {
  useGetCardsOfDeckQuery,
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetRandomCardQuery,
  useRateCardMutation,
  useUpdateCardMutation,
  useGetCardQuery,
} = cardsApi
