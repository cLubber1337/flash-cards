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

function handleIsOpen(isOpen: boolean): void {
  if (isOpen) {
    console.log('The component is open')
  } else {
    console.log('The component is closed')
  }
}

export const Default: Story = {
  args: {
    title: 'Add New Pack',
    onClose: handleIsOpen,
  },
}
