import { Card } from './components/ui/Card'
import { FontStyle, Typography } from './components/ui/Typography'

export const App = () => {
  return (
    <div style={{ margin: '150px 100px' }}>
      <Card>
        <Typography fontStyle={FontStyle.H2}>Hello World!</Typography>
      </Card>
    </div>
  )
}
