import { Slider } from '@/components/ui/Slider'
import { Header } from '@/Widgets/Header'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={false} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px' }}>
        <Slider defaultValue={[0, 100]} max={100} />
      </div>
    </div>
  )
}
