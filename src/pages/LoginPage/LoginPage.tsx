import { useState } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import s from './LoginPage.module.scss'

import { LoginForm, LoginFormValues } from '@/components/Auth/LoginForm'
import { useLoginMutation, useMeQuery } from '@/services/auth/authApi.ts'

export const LoginPage = () => {
  const { data } = useMeQuery()
  const [signIn, { isLoading: isLoadingLogin }] = useLoginMutation()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState<null | string>(null)

  const handleSignIn = (data: LoginFormValues) => {
    setLoginError(null)
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(e => {
        if (e.data?.message) {
          setLoginError(e.data.message)
        }
      })
  }

  if (data) return <Navigate to="/" />

  return (
    <div className={s.loginPage}>
      <LoginForm onSubmit={handleSignIn} disabled={isLoadingLogin} loginError={loginError} />
    </div>
  )
}
