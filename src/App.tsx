import { useState } from 'react'

import { Card } from '@/components/ui'
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
      <Modal lazy isOpen={isOpen} onClose={setIsOpen}>
        <Card>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu tellus sed est viverra
          varius. Integer ac erat at nulla dignissim lacinia. Suspendisse eget ullamcorper lorem.
          Curabitur id justo nec nunc volutpat efficitur vitae non turpis. Praesent auctor ornare
          velit, et efficitur urna tincidunt at. Sed at sem malesuada, ultricies leo a, dictum
          metus. Duis in placerat magna. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Ut semper mauris non turpis ullamcorper, eu ultricies nunc
          scelerisque. Nulla malesuada iaculis enim, ac malesuada nisl laoreet ac. Praesent
          consequat ante ut mauris dapibus tincidunt. Praesent sed tellus et metus dignissim
          consectetur. Sed ac tellus at diam fringilla tempus at eget erat. In eget libero feugiat,
          laoreet eros a, vulputate tortor. Quisque eget bibendum urna, a bibendum leo. Null
        </Card>
      </Modal>
    </div>
  )
}
