import s from './RegistrationPage.module.scss'

import { RegistrationForm } from '@/components/Auth/RegistrationForm'

interface RegistrationPageProps {}

export const RegistrationPage = ({}: RegistrationPageProps) => {
  return (
    <div className={s.registrationPage}>
      <RegistrationForm />
    </div>
  )
}
