import s from './CardHeader.module.scss'

import { ReactComponent as CloseIcon } from '@/assets/svg/close.svg'
import { Card, Typography, TypographyVariant } from '@/components/ui'

interface CardHeaderProps {
  title: string
  onClose: (isOpen: boolean) => void
}

export const CardHeader = ({ title, onClose }: CardHeaderProps) => {
  return (
    <Card className={s.cardHeader}>
      <Typography tag="h2" variant={TypographyVariant.H2}>
        {title}
      </Typography>
      <CloseIcon className={s.closeIcon} onClick={() => onClose(false)} />
    </Card>
  )
}
