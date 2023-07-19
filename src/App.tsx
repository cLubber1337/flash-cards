import { useState } from 'react'

import { Input } from '@/components/ui/Input'
import { Header } from '@/Widgets/Header'

export const App = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="container">
      <Header isAuth={true} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', margin: '50px' }}>
        <Input search type={'text'} value={search} onChange={setSearch} />
        <Input type={'password'} title={'Title'} />
      </div>
    </div>
  )
}
