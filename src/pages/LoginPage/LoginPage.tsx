import { Navigate, useNavigate } from 'react-router-dom'

import s from './LoginPage.module.scss'

import { LoginForm, LoginFormValues } from '@/components/Auth/LoginForm'
import { useLoginMutation, useMeQuery } from '@/services/auth/authApi.ts'

interface LoginPageProps {}

export const LoginPage = ({}: LoginPageProps) => {
  const { data, isLoading } = useMeQuery()
  const [signIn] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to="/" />

  const handleSignIn = (data: LoginFormValues) => {
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return (
    <div className={s.loginPage}>
      <LoginForm onSubmit={handleSignIn} />
    </div>
  )
}
