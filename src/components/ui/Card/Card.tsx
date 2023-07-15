import { ReactNode } from 'react'

import s from './Card.module.scss'

interface CardProps {
  children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return <div className={s.card}>{children}</div>
}
