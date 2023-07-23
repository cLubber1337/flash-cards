import s from './CardFooter.module.scss'

import { Button, Card } from '@/components/ui'

type CardFooterProps = {
  onAction: () => void
  titleOnAction?: string
} & (
  | {
      twoButtons: true
      onAction: () => void
      onDismiss: () => void
      titleOnDismiss?: string
    }
  | {
      twoButtons?: false
      onAction: () => void
      onDismiss?: never
      titleOnDismiss?: null
    }
)

export const CardFooter = ({
  onAction,
  onDismiss,
  twoButtons,
  titleOnAction = 'Confirm',
  titleOnDismiss = 'Cancel',
}: CardFooterProps) => {
  return (
    <Card className={s.cardFooter}>
      {twoButtons ? (
        <div className={s.twoButtons}>
          <Button variant="secondary" onClick={onDismiss}>
            {titleOnDismiss}
          </Button>
          <Button onClick={onAction}>{titleOnAction}</Button>
        </div>
      ) : (
        <div className={s.oneButton}>
          <Button onClick={onAction}>Confirm</Button>
        </div>
      )}
    </Card>
  )
}
