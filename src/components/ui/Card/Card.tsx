import { ReactNode } from 'react'

import s from './Card.module.scss'

interface CardProps {
  children?: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${s.card} ${className}`}>{children}</div>
}
