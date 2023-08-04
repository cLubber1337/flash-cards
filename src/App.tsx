import { RegistrationForm } from '@/components/Auth/RegistrationForm'
import { Header } from '@/widgets/Header'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <RegistrationForm />
      </div>
    </div>
  )
}
