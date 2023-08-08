import type { StoryObj } from '@storybook/react'

import { Header } from './Header.tsx'

const meta = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithAuth: Story = {
  args: {
    isAuth: true,
  },
}

export const HeaderWithoutAuth: Story = {}
