import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './ResetPasswordPage.module.scss'

import {
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
} from '@/components/Auth/CreateNewPasswordForm'
import { useResetPasswordMutation } from '@/services/auth/authApi.ts'

export const ResetPasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [resetPassword] = useResetPasswordMutation()

  const onSubmit = ({ password }: CreateNewPasswordFormValues) => {
    if (token) {
      resetPassword({ token, password })
        .unwrap()
        .then(res => {
          toast.success(res.message)
          navigate('/login')
        })
        .catch(e => toast.error(e.data.message))
    }
  }

  return (
    <div className={s.resetPasswordPage}>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </div>
  )
}
