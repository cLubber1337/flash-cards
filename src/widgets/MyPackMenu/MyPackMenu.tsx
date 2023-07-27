import s from './MyPackMenu.module.scss'

import { ReactComponent as BeakTopIcon } from '@/assets/svg/beakTop.svg'
import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as PlayIcon } from '@/assets/svg/play.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Button, Typography, TypographyVariant } from '@/components/ui'

interface MyPackMenuProps {}

export const MyPackMenu = ({}: MyPackMenuProps) => {
  return (
    <div className={s.myPackMenu}>
      <BeakTopIcon className={s.beakTopIcon} />
      <Button className={s.btn} variant="link">
        <PlayIcon />
        <Typography variant={TypographyVariant.Caption}>Play</Typography>
      </Button>
      <div className={s.hr} />
      <Button className={s.btn} variant="link">
        <EditIcon />
        <Typography variant={TypographyVariant.Caption}>Edit</Typography>
      </Button>
      <div className={s.hr} />
      <Button className={s.btn} variant="link">
        <TrashIcon />
        <Typography variant={TypographyVariant.Caption}>Delete</Typography>
      </Button>
    </div>
  )
}
