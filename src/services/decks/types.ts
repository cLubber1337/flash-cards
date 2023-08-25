export interface DecksResponse {
  maxCardsCount: number
  pagination: PaginationType
  items: Deck[]
}
export interface PaginationType {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export interface Author {
  id: string
  name: string
}
export type Deck = DeckByIdResponse & {
  isDeleted?: boolean | null
  isBlocked?: boolean | null
}

export type DeckByIdResponse = {
  author: Author
} & UpdateDeckResponse

export type UpdateDeckResponse = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type CreateDeckArgs = {
  name: string
  isPrivate?: boolean
  cover?: string
}

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type GetCardsOfDeckArgs = {
  id?: string
  answer?: string
  question?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type SortByType = {
  key: 'name' | 'cardsCount' | 'updated' | 'created' | 'answer' | 'question' | 'rating'
  direction: 'asc' | 'desc'
}
export interface DecksState {
  authorId: string | null
  deckCover: string | null
  deckName: string | null
  itemsPerPage: number
  currentPage: number
  searchByName: string
  sortBy: SortByType | ''
  numberOfCards: [number, number]
  deckIdForEdit: string
}
