import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DecksState } from './types.ts'

const initialState: DecksState = {
  deckId: '',
  deckCover: null,
  itemsPerPage: 8,
  currentPage: 1,
  searchByName: '',
  sortBy: '',
}

export const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
    setSortBy: (state, action: PayloadAction<DecksState['sortBy']>) => {
      state.sortBy = action.payload
    },
    setDeckId: (state, action: PayloadAction<string>) => {
      state.deckId = action.payload
    },
    setDeckCover: (state, action: PayloadAction<string | null>) => {
      state.deckCover = action.payload
    },
  },
})

export const { actions: decksActions } = decksSlice
