import { useState } from 'react'

import { Provider } from 'react-redux'

import { Pagination } from './Pagination.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    totalPages: 10,
    siblingsCount: 1,
    selectOptions: [
      { id: 1, title: '3' },
      { id: 2, title: '5' },
      { id: 3, title: '8' },
    ],
  },
}

export default meta

export const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)

  return (
    <Provider store={store}>
      <div style={{ position: 'relative', marginTop: '100px' }}>
        <Pagination
          {...meta.args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </Provider>
  )
}
