import { useState } from 'react'

import { CardFooter } from '@/components/ui'
import { Modal } from '@/components/ui/Modal/Modal.tsx'
import { Header } from '@/widgets/Header'

// const items: { id: number; title: string }[] = [
//   { id: 1, title: 'Picture' },
//   { id: 2, title: 'Video' },
//   { id: 3, title: 'Audio' },
//   { id: 4, title: 'Document' },
// ]

export const App = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="container">
      <Header isAuth={true} />
      <div style={{ margin: '100px' }}>
        <CardFooter onAction={() => null} twoButtons onDismiss={() => null} />
      </div>
      <Modal lazy isOpen={false} onClose={setIsOpen}></Modal>
    </div>
  )
}
