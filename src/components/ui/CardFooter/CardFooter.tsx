import s from './CardFooter.module.scss'

import { Button, Card } from '@/components/ui'

type CardFooterProps = {
  onAction: () => void
  titleOnAction?: string
  isLoading?: boolean
} & (
  | {
      twoButtons: true
      onAction: () => void
      onDismiss: (isOpen: boolean) => void
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
  isLoading = false,
}: CardFooterProps) => {
  return (
    <Card className={s.cardFooter}>
      {twoButtons ? (
        <div className={s.twoButtons}>
          <Button variant="secondary" onClick={() => onDismiss(false)} disabled={isLoading}>
            {titleOnDismiss}
          </Button>
          <Button onClick={onAction} type="submit" disabled={isLoading}>
            {titleOnAction}
          </Button>
        </div>
      ) : (
        <div className={s.oneButton}>
          <Button onClick={onAction} type="submit" disabled={isLoading}>
            Confirm
          </Button>
        </div>
      )}
    </Card>
  )
}
