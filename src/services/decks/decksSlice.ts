import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DecksState } from './types.ts'

const initialState: DecksState = {
  itemsPerPage: 8,
  currentPage: 1,
  searchByName: '',
  sortBy: '',
  deckName: localStorage.getItem('deckName') || null,
  numberOfCards: [0, 77],
  isInitDecks: false,
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
    setNumberOfCards: (state, action: PayloadAction<[number, number]>) => {
      state.numberOfCards = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      localStorage.setItem('deckName', action.payload)
      state.deckName = localStorage.getItem('deckName')
    },
    setIsInitDecks: (state, action: PayloadAction<boolean>) => {
      state.isInitDecks = action.payload
    },
  },
})

export const { actions: decksActions } = decksSlice
