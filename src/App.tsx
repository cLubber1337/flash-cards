import { Header } from '@/widgets/Header'
import { Table } from '@/widgets/Table'

export const App = () => {
  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <Table />
      </div>
    </div>
  )
}
