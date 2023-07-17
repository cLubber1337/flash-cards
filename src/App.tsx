import { ReactComponent as LogoutIcon } from './assets/svg/logoutIcon.svg'
import { Button } from './components/ui/Button'
import { Header } from './Widgets/Header'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={true} />
      <Button variant="primary" as={'a'} href={'https://google.com'}>
        <LogoutIcon />
        Sign In
      </Button>
    </div>
  )
}
