import { memo, ReactNode } from 'react'

import s from './TRow.module.scss'

interface TableRowProps {
  className?: string
  children: ReactNode
}

export const TRow = memo(({ className = '', children }: TableRowProps) => {
  return <tr className={`${s.tr} ${className}`}>{children}</tr>
})
