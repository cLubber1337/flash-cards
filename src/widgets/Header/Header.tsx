import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/Logo.svg'
import { DropdownUserMenu } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { useMeQuery } from '@/services/auth/authApi.ts'

export const Header = () => {
  const { data } = useMeQuery()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/">
          <Logo />
        </Link>
        {data ? (
          <DropdownUserMenu userData={data} />
        ) : (
          <Button as={Link} to="/login">
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
