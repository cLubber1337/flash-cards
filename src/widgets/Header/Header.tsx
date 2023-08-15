import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { ReactComponent as Logo } from '@/assets/svg/logo.svg'
import { DropdownUserMenu } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { useMeQuery } from '@/services/auth/authApi.ts'

export const Header = () => {
  const { data } = useMeQuery()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/">
          <Logo style={{ height: '36px', width: '250px' }} />
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
