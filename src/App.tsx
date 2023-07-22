import { Select } from '@/components/ui/Select'
import { Header } from '@/Widgets/Header'

const items: { id: number; title: string }[] = [
  { id: 1, title: 'Picture' },
  { id: 2, title: 'Video' },
  { id: 3, title: 'Audio' },
  { id: 4, title: 'Document' },
]

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={false} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px' }}>
        <Select items={items} fullWidth disabled={true} />
      </div>
    </div>
  )
}
