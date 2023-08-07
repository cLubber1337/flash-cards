import { UserMenu } from '../UserMenu'

import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/Logo.svg'
import { Dropdown } from '@/components/ui'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface HeaderProps {
  isAuth?: boolean
}

const userData = {
  name: 'John DoeDoe',
  email: 'JohnDoe666@ya.com',
}

export const Header = ({ isAuth }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />
        {isAuth ? (
          <div className={s.actions}>
            <Typography variant={TypographyVariant.Subtitle1} className={s.name}>
              {userData.name}
            </Typography>
            <Dropdown action={<Avatar avatarFallback="JD" />}>
              <UserMenu userData={userData} />
            </Dropdown>
          </div>
        ) : (
          <Button>
            <Typography tag="span" variant={TypographyVariant.Subtitle2}>
              Sign In
            </Typography>
          </Button>
        )}
      </div>
    </header>
  )
}
