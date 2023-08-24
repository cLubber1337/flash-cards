import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './RegistrationPage.module.scss'

import { RegistrationForm, RegistrationFormValues } from '@/components/Auth/RegistrationForm'
import { useRegisterMutation } from '@/services/auth/authApi.ts'

interface RegistrationPageProps {}

export const RegistrationPage = ({}: RegistrationPageProps) => {
  const [signUp] = useRegisterMutation()
  const navigate = useNavigate()
  const handleOnSubmit = (data: RegistrationFormValues) => {
    toast
      .promise(signUp({ email: data.email, password: data.password }).unwrap(), {
        pending: 'Please wait...',
        success: `The ${data.email} was successfully registered`,
        error: `The ${data.email} was not registered`,
      })
      .then(() => navigate('/'))
      .catch(e => {
        if (e.data.errorMessages) {
          toast.error(e.data.errorMessages[0])
        } else {
          toast.error('Something went wrong, please try again')
        }
      })
  }

  return (
    <div className={s.registrationPage}>
      <RegistrationForm onSubmit={handleOnSubmit} />
    </div>
  )
}
