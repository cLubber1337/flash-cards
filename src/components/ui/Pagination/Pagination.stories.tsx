import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { Pagination } from './Pagination.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingsCount: 1,
    itemsPerPage: 10,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Provider store={store}>
      <div style={{ position: 'relative', marginTop: '100px' }}>
        <Pagination {...meta.args} />
      </div>
    </Provider>
  ),
}
