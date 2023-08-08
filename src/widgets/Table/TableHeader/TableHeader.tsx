import { ReactComponent as ArrowDownIcon } from '../../../assets/svg/arrowDown.svg'

import s from './TableHeader.module.scss'

import { Typography, TypographyVariant } from '@/components/ui'
import { TableCell } from '@/widgets/Table/TableCell/TableCell.tsx'

interface TableHeaderProps {}

export const TableHeader = ({}: TableHeaderProps) => {
  return (
    <thead>
      <tr className={s.row}>
        <TableCell>
          <Typography variant={TypographyVariant.Subtitle2}>Name</Typography>
        </TableCell>
        <TableCell>
          <Typography variant={TypographyVariant.Subtitle2}>Cards</Typography>
        </TableCell>
        <TableCell>
          <Typography tag="span" variant={TypographyVariant.Subtitle2}>
            Last update
          </Typography>
          <ArrowDownIcon className={s.icon} />
        </TableCell>
        <TableCell>
          <Typography tag="span" variant={TypographyVariant.Subtitle2}>
            Created by
          </Typography>
        </TableCell>
      </tr>
    </thead>
  )
}
