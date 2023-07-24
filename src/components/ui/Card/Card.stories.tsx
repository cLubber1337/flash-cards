import type { StoryObj } from '@storybook/react'

import { Card } from './Card.tsx'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    style: {
      width: '100%',
      height: '100%',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: '',
    children: <div>Title</div>,
  },
}
