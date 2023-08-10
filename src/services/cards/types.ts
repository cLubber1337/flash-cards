import { PaginationType, SortByType } from '@/services/decks/types.ts'

export interface CardsState {
  itemsPerPage: number
  currentPage: number
  searchByName: string
  sortBy: SortByType | ''
}

export interface CardsResponse {
  pagination: PaginationType
  items: Card[]
}
export interface Card {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}
