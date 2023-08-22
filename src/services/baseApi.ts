import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from './baseApiWithRefresh.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Me', 'Learn', 'Card', 'Deck'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})

//customFetchBase
