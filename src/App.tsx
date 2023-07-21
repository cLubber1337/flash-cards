import { TabSwitcher } from '@/components/ui/TabSwitcher'
import { Header } from '@/Widgets/Header'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={false} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px' }}>
        <TabSwitcher tabs={['Account', 'Password', 'Register', 'Information']} disabled={true} />
      </div>
    </div>
  )
}
