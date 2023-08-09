import { memo } from 'react'

import s from './TableRow.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as PlayIcon } from '@/assets/svg/play.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { TableCell } from '@/widgets/Table/TableCell/TableCell.tsx'

interface TableRowProps {
  packName: string
  numberOfCards: number
  lastUpdate: string
  createdBy: string
  cover: string | null
}

export const TableRow = memo(
  ({ packName, numberOfCards, lastUpdate, createdBy, cover }: TableRowProps) => {
    return (
      <tr className={s.tr}>
        <TableCell className={s.deckName}>
          <div className={s.deckImg}>
            <img src={cover ? cover : deckImg} alt="deck" className={s.img} />
          </div>
          <Typography variant={TypographyVariant.Body2} className={s.deckTitle}>
            {packName}
          </Typography>
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
)
