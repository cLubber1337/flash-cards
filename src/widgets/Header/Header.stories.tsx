import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { Header } from './Header.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Provider store={store}>
      <Header />
    </Provider>
  ),
}
