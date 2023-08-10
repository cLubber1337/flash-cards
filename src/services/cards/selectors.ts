import { RootState } from '@/services/store.ts'

export const selectCardsItemsPerPage = (state: RootState) => state.cards.itemsPerPage
export const selectCardsCurrentPage = (state: RootState) => state.cards.currentPage
export const selectCardsSearchByName = (state: RootState) => state.cards.searchByName

export const selectCardsSortBy = (state: RootState) => state.cards.sortBy
