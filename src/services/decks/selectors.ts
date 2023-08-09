import { RootState } from '@/services/store.ts'

export const selectItemsPerPage = (state: RootState) => state.decks.itemsPerPage
export const selectCurrentPage = (state: RootState) => state.decks.currentPage
export const selectSearchByName = (state: RootState) => state.decks.searchByName

export const selectSortBy = (state: RootState) => state.decks.sortBy
