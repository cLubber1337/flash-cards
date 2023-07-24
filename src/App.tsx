import { Header } from '@/widgets/Header'
import { UserDropdownMenu } from '@/widgets/UserDropdownMenu'

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
        <UserDropdownMenu />
      </div>
    </div>
  )
}
