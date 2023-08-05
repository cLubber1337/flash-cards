import { ReactComponent as EditIcon } from '../../../assets/svg/edit.svg'
import { ReactComponent as PlayIcon } from '../../../assets/svg/play.svg'
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg'
import { TableCell } from '../TableCell/TableCell.tsx'

import s from './TableRow.module.scss'

import { Typography, TypographyVariant } from '@/components/ui'

interface TableRowProps {
  packName: string
  numberOfCards: number
  lastUpdate: string
  createdBy: string
}

export const TableRow = ({ packName, numberOfCards, lastUpdate, createdBy }: TableRowProps) => {
  return (
    <tr className={s.tr}>
      <TableCell>
        <Typography variant={TypographyVariant.Body2}>{packName}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant={TypographyVariant.Body2}>{numberOfCards}</Typography>
      </TableCell>
      <TableCell>
        <Typography tag="span" variant={TypographyVariant.Body2}>
          {lastUpdate}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography tag="span" variant={TypographyVariant.Body2}>
          {createdBy}
        </Typography>
      </TableCell>
      <TableCell>
        <PlayIcon />
        <EditIcon />
        <TrashIcon />
      </TableCell>
    </tr>
  )
}
