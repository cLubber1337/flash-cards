import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { DecksPage } from './DecksPage.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'pages/DecksPage',
  component: DecksPage,
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <Provider store={store}>
      <DecksPage />
    </Provider>
  ),
}
