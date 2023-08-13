import type { StoryObj } from '@storybook/react'

import { ProfilePage } from './ProfilePage.tsx'

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
