import { memo } from 'react'

import s from './TableHeader.module.scss'

import { ReactComponent as ArrowDownIcon } from '@/assets/svg/arrowDown.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/svg/arrowUp.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { decksActions } from '@/services/decks/decksSlice.ts'
import { SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { columns } from '@/utils/constants'
import { TableCell } from '@/widgets/Table/TableCell/TableCell.tsx'

interface TableHeaderProps {
  sortBy?: SortByType | ''
}

export const TableHeader = memo(({ sortBy }: TableHeaderProps) => {
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
      <tr className={s.row}>
        {columns.map(({ title, key }) => (
          <TableCell key={key} className={s.cell} onClick={handleSort(key)}>
            <Typography tag="span" variant={TypographyVariant.Subtitle2}>
              {title}
            </Typography>
            {sortBy && sortBy.key === key && (
              <>{sortBy.direction === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}</>
            )}
          </TableCell>
        ))}
      </tr>
    </thead>
  )
})
