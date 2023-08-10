import { SortByType } from '@/services/decks/types.ts'

export type DecksHeaderColumnsType = {
  key: SortByType['key']
  title: 'Name' | 'Cards' | 'Last Updated' | 'Created by'
}

export const decksHeaderColumns: DecksHeaderColumnsType[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'created',
    title: 'Created by',
  },
]
