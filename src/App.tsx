import { RadioGroup } from '@/components/ui/RadioGroup'
import { Header } from '@/Widgets/Header'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={false} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px' }}>
        <RadioGroup disabled={false} />
      </div>
    </div>
  )
}
