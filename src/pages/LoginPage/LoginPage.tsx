import s from './LoginPage.module.scss'

import { LoginForm } from '@/components/Auth/LoginForm'

interface LoginPageProps {}

export const LoginPage = ({}: LoginPageProps) => {
  return (
    <div className={s.loginPage}>
      <LoginForm />
    </div>
  )
}
