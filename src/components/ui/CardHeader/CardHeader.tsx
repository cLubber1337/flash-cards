import s from './CardHeader.module.scss'

import { ReactComponent as CloseIcon } from '@/assets/svg/close.svg'
import { Card, Typography, TypographyVariant } from '@/components/ui'

interface CardHeaderProps {
  title: string
  onClick: () => void
}

export const CardHeader = ({ title, onClick }: CardHeaderProps) => {
  return (
    <Card className={s.cardHeader}>
      <Typography tag="h2" variant={TypographyVariant.H2}>
        {title}
      </Typography>
      <CloseIcon onClick={onClick} />
    </Card>
  )
}
