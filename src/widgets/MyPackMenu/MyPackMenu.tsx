import { Popover } from '@headlessui/react'

import s from './MyPackMenu.module.scss'

import { ReactComponent as BeakTopIcon } from '@/assets/svg/beakTop.svg'
import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as MoreIcon } from '@/assets/svg/more.svg'
import { ReactComponent as PlayIcon } from '@/assets/svg/play.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Button, Typography, TypographyVariant } from '@/components/ui'

interface MyPackMenuProps {
  onClickLearnPack: () => void
}

export const MyPackMenu = ({ onClickLearnPack }: MyPackMenuProps) => {
  return (
    <Popover className={s.popover}>
      <Popover.Button className={s.action}>
        <MoreIcon />
      </Popover.Button>
      <Popover.Panel className={s.content}>
        <div className={s.myPackMenu}>
          <BeakTopIcon className={s.beakTopIcon} />
          <Button className={s.btn} variant="link" onClick={() => onClickLearnPack()}>
            <PlayIcon />
            <Typography variant={TypographyVariant.Caption}>Play</Typography>
          </Button>
          <div className={s.hr} />
          <Button className={s.btn} variant="link" onClick={() => null}>
            <EditIcon />
            <Typography variant={TypographyVariant.Caption}>Edit</Typography>
          </Button>
          <div className={s.hr} />
          <Button className={s.btn} variant="link" onClick={() => null}>
            <TrashIcon />
            <Typography variant={TypographyVariant.Caption}>Delete</Typography>
          </Button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}
