import { ReactNode } from 'react'

import s from './TableCell.module.scss'

interface TableCellProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const TableCell = ({ children, className, onClick }: TableCellProps) => {
  return (
    <td onClick={onClick} className={`${s.tableCell} ${className}`}>
      {children}
    </td>
  )
}
