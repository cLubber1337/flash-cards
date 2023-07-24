import { Card, RadioGroup } from '@/components/ui'
import { Header } from '@/widgets/Header'

const items: { id: number; title: string }[] = [
  { id: 1, title: 'Picture' },
  { id: 2, title: 'Video' },
  { id: 3, title: 'Audio' },
  { id: 4, title: 'Document' },
]

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        {/*<RadioGroup items={items} />*/}
        <Card style={{ padding: '40px', height: '300px' }}>
          <RadioGroup items={items} />
        </Card>
      </div>
    </div>
  )
}
