import { ReactNode } from 'react'

import s from './TableCell.module.scss'

interface TableCellProps {
  children: ReactNode
}

export const TableCell = ({ children }: TableCellProps) => {
  return <td className={s.tableCell}>{children}</td>
}
