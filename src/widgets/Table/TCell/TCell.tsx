import { ReactNode } from 'react'

import s from './TCell.module.scss'

interface TableCellProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const TCell = ({ children, className = '', onClick }: TableCellProps) => {
  return (
    <td onClick={onClick} className={`${s.tableCell} ${className}`}>
      {children}
    </td>
  )
}
