import { Button } from './components/ui/Button'
import { FontStyle, Typography } from './components/ui/Typography'

export const App = () => {
  return (
    <div style={{ margin: '150px 100px' }}>
      <Button variant="tertiary">
        <Typography tag="span" fontStyle={FontStyle.Subtitle2}>
          Button primary
        </Typography>
      </Button>
    </div>
  )
}
