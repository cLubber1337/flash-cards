import type { StoryObj } from '@storybook/react'

import { Grade } from './Grade.tsx'

const meta = {
  title: 'Components/Grade',
  component: Grade,
  tags: ['autodocs'],
  args: { grade: 3 },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
