import { CheckEmail } from './CheckEmail/CheckEmail.tsx'
import s from './ForgotPasswordPage.module.scss'

import { ForgotPasswordForm } from '@/components/Auth/ForgotPasswordForm'

interface ForgotPasswordPageProps {}

export const ForgotPasswordPage = ({}: ForgotPasswordPageProps) => {
  const hasMailSent = true

  return (
    <div className={s.forgotPasswordPage}>
      {!hasMailSent ? <ForgotPasswordForm /> : <CheckEmail />}
    </div>
  )
}
