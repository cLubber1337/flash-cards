import { Card, Checkbox, RadioGroup } from '@/components/ui'
import { AddNewPack } from '@/widgets/AddNewPack'
import { Header } from '@/widgets/Header'

// const items: { id: number; title: string }[] = [
//   { id: 1, title: 'Picture' },
//   { id: 2, title: 'Video' },
//   { id: 3, title: 'Audio' },
//   { id: 4, title: 'Document' },
// ]

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <Checkbox text={'asdasdadas'} id={'c3'} />
        <AddNewPack />
        <Card style={{ padding: '20px' }}>
          <Checkbox text={'1111'} id={'c2'} />
        </Card>
      </div>
    </div>
  )
}
