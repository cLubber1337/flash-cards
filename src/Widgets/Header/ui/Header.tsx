// import { Button } from '../../../components/ui/Button'
// import { FontStyle, Typography } from '../../../components/ui/Typography'
import { Avatar } from '../../../components/ui'
import { FontStyle, Typography } from '../../../components/ui/Typography'
import logo from '../assets/Logo.svg'

import s from './Header.module.scss'

export const Header = () => {
  return (
    <header className={s.header}>
      <img src={logo} alt="logo" />

      <div className={s.actions}>
        <Typography fontStyle={FontStyle.Subtitle1} className={s.name}>
          Ivan
        </Typography>
        <Avatar alt="avatar" avatarFallback={'I'} />
      </div>

      {/*<Button>*/}
      {/*  <Typography tag="span" fontStyle={FontStyle.Subtitle2}>*/}
      {/*    Sign In*/}
      {/*  </Typography>*/}
      {/*</Button>*/}
    </header>
  )
}
