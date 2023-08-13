import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/Logo.svg'
import { DropdownUserMenu } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { useLogoutMutation, useMeQuery } from '@/services/auth/authApi.ts'

export const Header = () => {
  const { data, isLoading } = useMeQuery()

  const [logout] = useLogoutMutation()

  if (isLoading) return null

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/">
          <Logo />
        </Link>
        {data ? (
          <DropdownUserMenu userData={data} logout={logout} />
        ) : (
          <Button as={Link} to="/login">
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
