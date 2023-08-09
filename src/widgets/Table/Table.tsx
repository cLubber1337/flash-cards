import { memo } from 'react'

import s from './Table.module.scss'
import { TableHeader } from './TableHeader/TableHeader.tsx'
import { TableRow } from './TableRow/TableRow.tsx'

import { Deck, SortByType } from '@/services/decks/types.ts'

interface TableProps {
  data?: Deck[]
  sortBy: SortByType | ''
}

export const Table = memo(({ data, sortBy }: TableProps) => {
  return (
    <table className={s.table}>
      <TableHeader sortBy={sortBy} />
      <tbody>
        {data?.map(deck => {
          return (
            <TableRow
              key={deck.id}
              numberOfCards={deck.cardsCount}
              createdBy={deck.author.name}
              packName={deck.name}
              lastUpdate={new Date(deck.updated).toLocaleDateString('en-GB')}
              cover={deck.cover}
            />
          )
        })}
      </tbody>
    </table>
  )
})
