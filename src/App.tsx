import { Link } from 'react-router-dom'

import { Button } from './components/ui/Button/Button'

export function App() {
  return (
    <div>
      <h1>Title</h1>
      <Button as={Link} to={'/'}>
        Home
      </Button>
    </div>
  )
}
