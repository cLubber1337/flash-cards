import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DecksState } from './types.ts'

const initialState: DecksState = {
  deckCover: localStorage.getItem('deckCover') || null,
  itemsPerPage: 8,
  currentPage: 1,
  searchByName: '',
  sortBy: '',
  authorId: localStorage.getItem('authorId') || null,
  deckName: localStorage.getItem('deckName') || null,
  numberOfCards: [0, 20],
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
    setDeckCover: (state, action: PayloadAction<string | null>) => {
      localStorage.setItem('deckCover', action.payload || '')
      state.deckCover = localStorage.getItem('deckCover')
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      localStorage.setItem('authorId', action.payload)
      state.authorId = localStorage.getItem('authorId')
    },
    setNumberOfCards: (state, action: PayloadAction<[number, number]>) => {
      state.numberOfCards = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      localStorage.setItem('deckName', action.payload)
      state.deckName = localStorage.getItem('deckName')
    },
  },
})

export const { actions: decksActions } = decksSlice
