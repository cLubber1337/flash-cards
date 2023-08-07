import s from './ForgotPasswordPage.module.scss'

import { ForgotPasswordForm } from '@/components/Auth/ForgotPasswordForm'

interface ForgotPasswordPageProps {}

export const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
  return (
    <div className={s.forgotPasswordPage}>
      <ForgotPasswordForm />
    </div>
  )
}
