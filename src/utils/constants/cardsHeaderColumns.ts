import { SortByType } from '@/services/decks/types.ts'

export type CardsHeaderColumnsType = {
  key: SortByType['key']
  title: 'Question' | 'Answer' | 'Last Updated' | 'Grade'
}

export const cardsHeaderColumns: CardsHeaderColumnsType[] = [
  {
    key: 'question',
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'rating',
    title: 'Grade',
  },
]
