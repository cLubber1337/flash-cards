import type { StoryObj } from '@storybook/react'

import { Avatar } from './Avatar.tsx'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    src: 'https://p-hold.com/200/01553b',
    alt: 'Avatar',
    avatarFallback: 'DD',
  },
}

export const WithFallback: Story = {
  args: {
    avatarFallback: 'DD',
  },
}
