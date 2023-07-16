import { useState } from 'react'

import { Input } from './components/ui/Input'

export const App = () => {
  const [value, setValue] = useState('')

  return (
    <div style={{ margin: '150px 100px' }}>
      <Input
        onChange={setValue}
        value={value}
        title="Input"
        placeholder="Input search"
        error={''}
        fullWidth={false}
        search={false}
        type="password"
        disabled={false}
      />
    </div>
  )
}
