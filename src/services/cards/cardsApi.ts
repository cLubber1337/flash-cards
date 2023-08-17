import { baseApi } from '@/services/baseApi.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<CreateCardResponse, { id: string; formData: FormData }>({
      query: args => {
        return {
          url: `v1/decks/${args.id}/cards`,
          method: 'POST',
          body: args.formData,
        }
      },
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const { useCreateCardMutation } = cardsApi

export type CreateCardResponse = {
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
