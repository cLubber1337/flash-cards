import { memo } from 'react'

import s from './TableCards.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { Card } from '@/services/cards'
import { SortByType } from '@/services/decks/types.ts'
import { cardsHeaderColumns } from '@/utils/constants/cardsHeaderColumns.ts'
import { TCell } from '@/widgets/Table/TCell/TCell.tsx'
import { THeader } from '@/widgets/Table/THeader/THeader.tsx'
import { TRow } from '@/widgets/Table/TRow/TRow.tsx'

interface TableCardsProps {
  data?: Card[]
  sortBy: SortByType | ''
}

export const TableCards = memo(({ data, sortBy }: TableCardsProps) => {
  const myCards = false

  return (
    <table className={s.table}>
      <THeader
        sortBy={sortBy}
        columns={cardsHeaderColumns}
        className={myCards ? s.myRow : s.friendsRow}
      />

      <tbody>
        {data?.map(({ id, answer, question, updated, grade }) => {
          return (
            <TRow key={id} className={myCards ? s.myRow : s.friendsRow}>
              <TCell className={s.col_1}>
                <Typography variant={TypographyVariant.Body2} className={s.deckTitle}>
                  {question}
                </Typography>
              </TCell>
              <TCell className={s.col_1}>
                <Typography variant={TypographyVariant.Body2}>{answer}</Typography>
              </TCell>
              <TCell>
                <Typography tag="span" variant={TypographyVariant.Body2}>
                  {new Date(updated).toLocaleDateString('en-GB')}
                </Typography>
              </TCell>
              <TCell>
                <Typography tag="span" variant={TypographyVariant.Body2}>
                  {grade}
                </Typography>
              </TCell>
              {myCards && (
                <TCell>
                  <EditIcon onClick={() => null} />
                  <TrashIcon onClick={() => null} />
                </TCell>
              )}
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
})
