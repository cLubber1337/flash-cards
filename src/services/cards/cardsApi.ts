import { baseApi } from '@/services/baseApi.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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
    deleteCard: builder.mutation<void, { id: string }>({
      query: ({ id }) => {
        return {
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Cards'],
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
      invalidatesTags: ['Learn'],
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useLazyGetRandomCardQuery,
  useGetRandomCardQuery,
  useRateCardMutation,
} = cardsApi

export type CardResponse = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type CreateCardArgs = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}
