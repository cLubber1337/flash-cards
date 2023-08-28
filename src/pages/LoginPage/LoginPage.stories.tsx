import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { LoginPage } from './LoginPage.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Pages/LoginPage',
  component: LoginPage,
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  ),
}
