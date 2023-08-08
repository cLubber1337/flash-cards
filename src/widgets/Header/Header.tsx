import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/Logo.svg'
import { DropdownUserMenu } from '@/components/ui'
import { Button } from '@/components/ui/Button'

const userData = {
  name: 'John DoeDoe',
  email: 'JohnDoe666@ya.com',
}

export const Header = () => {
  const isAuth = true

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/">
          <Logo />
        </Link>
        {isAuth ? (
          <DropdownUserMenu userData={userData} />
        ) : (
          <Button as={Link} to="/login">
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
