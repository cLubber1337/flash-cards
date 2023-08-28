import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { ResetPasswordPage } from './ResetPasswordPage.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Pages/ResetPasswordPage',
  component: ResetPasswordPage,
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Provider store={store}>
      <ResetPasswordPage />
    </Provider>
  ),
}
