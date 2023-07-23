import s from './CardFooter.module.scss'

import { Card } from '@/components/ui'

interface CardFooterProps {
  onConfirm?: () => void
  onCancel?: () => void
}

export const Select = ({}: CardFooterProps) => {
  return (
    <div className={s.CardFooter}>
      <Card></Card>
    </div>
  )
}
