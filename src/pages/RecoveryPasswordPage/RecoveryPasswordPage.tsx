import { useState } from 'react'

import { toast } from 'react-toastify'

import s from './RecoveryPasswordPage.module.scss'

import {
  CheckEmail,
  ForgotPasswordForm,
  ForgotPasswordFormValues,
} from '@/components/Auth/ForgotPasswordForm'
import { usePasswordRecoveryMutation } from '@/services/auth/authApi.ts'

export const RecoveryPasswordPage = () => {
  const [hasEmailSent, setHasEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  const [recoverPassword] = usePasswordRecoveryMutation()

  const onSubmit = ({ email }: ForgotPasswordFormValues) => {
    recoverPassword(email)
      .unwrap()
      .then(res => {
        toast.success(res.message)
        setEmail(email)
        setHasEmailSent(prev => !prev)
      })
      .catch(e => {
        toast.error(e.data.message)
      })
  }

  return (
    <div className={s.forgotPasswordPage}>
      {hasEmailSent ? <CheckEmail email={email} /> : <ForgotPasswordForm onSubmit={onSubmit} />}
    </div>
  )
}
