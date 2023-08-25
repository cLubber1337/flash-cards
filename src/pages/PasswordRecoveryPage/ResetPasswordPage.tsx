import s from './ResetPasswordPage.module.scss'

import {
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
} from '@/components/Auth/CreateNewPasswordForm'

export const ResetPasswordPage = () => {
  const onSubmit = ({ password }: CreateNewPasswordFormValues) => {
    console.log(password)
  }

  return (
    <div className={s.resetPasswordPage}>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </div>
  )
}
