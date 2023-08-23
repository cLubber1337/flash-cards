import {
  CreateDeckArgs,
  DeckByIdResponse,
  DecksResponse,
  GetDecksArgs,
  UpdateDeckResponse,
} from './types.ts'

import { baseApi } from '@/services/baseApi.ts'

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
    getDeckById: builder.query<DeckByIdResponse, { id: string }>({
      query: args => {
        return {
          url: `v1/decks/${args.id}`,
          method: 'GET',
        }
      },
      providesTags: ['Deck'],
    }),
    createDeck: builder.mutation<DeckByIdResponse, CreateDeckArgs>({
      query: formData => {
        return {
          url: 'v1/decks',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<DeckByIdResponse, { id: string; formData: CreateDeckArgs }>({
      query: args => {
        return {
          url: `v1/decks/${args.id}`,
          method: 'PATCH',
          body: args.formData,
        }
      },
      invalidatesTags: ['Decks', 'Deck'],
    }),
    deleteDeck: builder.mutation<UpdateDeckResponse, { id: string }>({
      query: ({ id }) => {
        return {
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Decks'],
    }),
  }),
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useUpdateDeckMutation,
} = decksApi
