import { ReactNode } from 'react'

import s from './Card.module.scss'

interface CardProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Card = ({ children, className = '', style }: CardProps) => {
  return (
    <div style={style} className={`${s.card} ${className}`}>
      {children}
    </div>
  )
}
