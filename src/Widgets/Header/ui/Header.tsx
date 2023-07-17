import { ReactComponent as Logo } from '../../../assets/svg/Logo.svg'
import { Avatar } from '../../../components/ui'
import { Button } from '../../../components/ui/Button'
import { FontStyle, Typography } from '../../../components/ui/Typography'

import s from './Header.module.scss'

interface HeaderProps {
  isAuth: boolean
}

export const Header = ({ isAuth }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Logo />

      {isAuth ? (
        <div className={s.actions}>
          <Typography fontStyle={FontStyle.Subtitle1} className={s.name}>
            Ivan
          </Typography>
          <Avatar alt="avatar" avatarFallback={'I'} />
        </div>
      ) : (
        <Button>
          <Typography tag="span" fontStyle={FontStyle.Subtitle2}>
            Sign In
          </Typography>
        </Button>
      )}
    </header>
  )
}
