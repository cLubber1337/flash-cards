import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardsState } from './types.ts'

const initialState: CardsState = {
  itemsPerPage: 8,
  currentPage: 1,
  searchByName: '',
  sortBy: '',
}

export const cardsSlice = createSlice({
  name: 'cards',
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
    setSortBy: (state, action: PayloadAction<CardsState['sortBy']>) => {
      state.sortBy = action.payload
    },
  },
})

export const { actions: cardsActions } = cardsSlice
