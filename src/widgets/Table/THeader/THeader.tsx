import { memo } from 'react'

import { TCell } from '../TCell/TCell.tsx'

import s from './THeader.module.scss'

import { ReactComponent as ArrowDownIcon } from '@/assets/svg/arrowDown.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/svg/arrowUp.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { decksActions } from '@/services/decks/decksSlice.ts'
import { SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { CardsHeaderColumnsType } from '@/utils/constants/cardsHeaderColumns.ts'
import { DecksHeaderColumnsType } from '@/utils/constants/decksHeaderColumns.ts'

interface TableHeaderProps {
  sortBy?: SortByType | ''
  columns: DecksHeaderColumnsType[] | CardsHeaderColumnsType[]
  className?: string
}

export const THeader = memo(({ sortBy, columns, className = '' }: TableHeaderProps) => {
  const dispatch = useAppDispatch()
  const handleSort = (key: SortByType['key']) => () => {
    if (sortBy && sortBy?.direction === 'desc') {
      dispatch(decksActions.setSortBy(''))
    } else {
      dispatch(
        decksActions.setSortBy({
          key,
          direction: sortBy && sortBy?.direction === 'asc' ? 'desc' : 'asc',
        })
      )
    }
  }

  return (
    <thead>
      <tr className={`${s.row} ${className}`}>
        {columns.map(({ title, key }) => (
          <TCell key={key} className={s.cell} onClick={handleSort(key)}>
            <Typography tag="span" variant={TypographyVariant.Subtitle2}>
              {title}
            </Typography>
            {sortBy && sortBy.key === key && (
              <>{sortBy.direction === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}</>
            )}
          </TCell>
        ))}
      </tr>
    </thead>
  )
})
