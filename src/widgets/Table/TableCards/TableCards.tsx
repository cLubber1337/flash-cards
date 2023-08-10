import { memo } from 'react'

import s from './TableCards.module.scss'

import { Deck } from '@/services/decks'
import { SortByType } from '@/services/decks/types.ts'
import { cardsHeaderColumns } from '@/utils/constants/cardsHeaderColumns.ts'
import { THeader } from '@/widgets/Table/THeader/THeader.tsx'

interface TableCardsProps {
  data?: Deck[]
  sortBy: SortByType | ''
}

export const TableCards = memo(({ data, sortBy }: TableCardsProps) => {
  return (
    <div className={s.table}>
      <THeader sortBy={sortBy} columns={cardsHeaderColumns} />
    </div>
  )
})
