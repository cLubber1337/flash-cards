import { ReactNode } from 'react'

import { Popover } from '@headlessui/react'
import { Link } from 'react-router-dom'

import s from './DropdownUserMenu.module.scss'

import { ReactComponent as BeakTopIcon } from '@/assets/svg/beakTop.svg'
import { ReactComponent as LogoutIcon } from '@/assets/svg/logoutIcon.svg'
import { ReactComponent as PersonIcon } from '@/assets/svg/person.svg'
import { Avatar, Button, Typography, TypographyVariant } from '@/components/ui'

interface DropdownUserMenuProps {
  userData: {
    name: string
    email: string
  }
  children?: ReactNode
}

export const DropdownUserMenu = ({ userData }: DropdownUserMenuProps) => {
  return (
    <Popover className={s.popover}>
      <Popover.Button className={s.action}>
        <div className={s.actions}>
          <Typography variant={TypographyVariant.Subtitle1} className={s.username}>
            {userData.name}
          </Typography>
          <Avatar avatarFallback="JD" cursor="pointer" />
        </div>
      </Popover.Button>

      <Popover.Panel className={s.content}>
        {({ close }) => (
          <div className={s.userMenu}>
            <BeakTopIcon className={s.beakTopIcon} />
            <div className={s.info}>
              <Avatar avatarFallback="JD" cursor="auto" />
              <div className={s.name}>
                <Typography variant={TypographyVariant.Subtitle2}>{userData?.name}</Typography>
                <Typography variant={TypographyVariant.Caption} className={s.email}>
                  {userData?.email}
                </Typography>
              </div>
            </div>
            <div className={s.hr} />
            <Button
              as={Link}
              to="/profile"
              variant="link"
              className={s.btn}
              onClick={() => close()}
            >
              <PersonIcon />
              <Typography variant={TypographyVariant.Caption}>My Profile</Typography>
            </Button>
            <div className={s.hr} />
            <Button variant="link" className={s.btn}>
              <LogoutIcon />
              <Typography variant={TypographyVariant.Caption}>Sign Out</Typography>
            </Button>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}
