import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { CardHeader } from './CardHeader.tsx'

const meta = {
  title: 'Components/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Add New Pack',
    onClick: () => null,
  },
}
