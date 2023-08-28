import type { StoryObj } from '@storybook/react'

import { NotFoundPage } from './NotFoundPage.tsx'

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
