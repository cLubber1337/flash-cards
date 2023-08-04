import { SubmitHandler } from 'react-hook-form'

import { ForgotPasswordForm, ForgotPasswordFormValues } from '@/components/Auth/ForgotPasswordForm'
import { Header } from '@/widgets/Header'

export const App = () => {
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = data => {
    console.log(data)
  }

  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <ForgotPasswordForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
