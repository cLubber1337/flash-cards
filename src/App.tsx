import { useState } from 'react'

import { TextField } from '@/components/ui'
import { Header } from '@/widgets/Header'

export const App = () => {
  const [value, setValue] = useState('')

  // console.log(value)

  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <TextField search customValue={value} onChangeValue={setValue} />
      </div>
    </div>
  )
}
