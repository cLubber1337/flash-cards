import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/Logo.svg'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface HeaderProps {
  isAuth?: boolean
}

export const Header = ({ isAuth }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Logo />
      {isAuth ? (
        <div className={s.actions}>
          <Typography variant={TypographyVariant.Subtitle1} className={s.name}>
            Ivan
          </Typography>
          <Avatar alt="avatar" avatarFallback={'I'} />
        </div>
      ) : (
        <Button>
          <Typography tag="span" variant={TypographyVariant.Subtitle2}>
            Sign In
          </Typography>
        </Button>
      )}
    </header>
  )
}
