import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { CardFooter } from './CardFooter.tsx'

const meta = {
  title: 'Components/CardFooter',
  component: CardFooter,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CardFooter>

export default meta
type Story = StoryObj<typeof meta>

export const WithTwoButtons: Story = {
  args: {
    twoButtons: true,
    onAction: () => null,
    onDismiss: () => null,
  },
}

export const WithTOneButton: Story = {
  args: {
    twoButtons: false,
    onAction: () => null,
  },
}
