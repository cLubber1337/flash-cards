import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { LearnPackPage } from './LearnPackPage.tsx'

import { store } from '@/services/store.ts'

const meta = {
  title: 'Pages/LearnPackPage',
  component: LearnPackPage,
  args: {},
} satisfies Meta<typeof LearnPackPage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => (
    <Provider store={store}>
      <LearnPackPage {...args} />
    </Provider>
  ),
}
