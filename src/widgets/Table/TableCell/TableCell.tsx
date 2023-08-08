import { ReactNode } from 'react'

import s from './TableCell.module.scss'

interface TableCellProps {
  children: ReactNode
  className?: string
}

export const TableCell = ({ children, className }: TableCellProps) => {
  return <td className={`${s.tableCell} ${className}`}>{children}</td>
}
