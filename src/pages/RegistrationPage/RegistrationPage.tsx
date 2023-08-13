import { useNavigate } from 'react-router-dom'

import s from './RegistrationPage.module.scss'

import { RegistrationForm, RegistrationFormValues } from '@/components/Auth/RegistrationForm'
import { useRegisterMutation } from '@/services/auth/authApi.ts'

interface RegistrationPageProps {}

export const RegistrationPage = ({}: RegistrationPageProps) => {
  const [register] = useRegisterMutation()
  const navigate = useNavigate()
  const handleOnSubmit = (data: RegistrationFormValues) => {
    register({ email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div className={s.registrationPage}>
      <RegistrationForm onSubmit={handleOnSubmit} />
    </div>
  )
}
