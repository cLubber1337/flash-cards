import { SubmitHandler } from 'react-hook-form'

import {
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
} from '@/components/Auth/CreateNewPasswordForm'
import { Header } from '@/widgets/Header'

export const App = () => {
  const onSubmit: SubmitHandler<CreateNewPasswordFormValues> = data => {
    console.log(data)
  }

  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <CreateNewPasswordForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}
