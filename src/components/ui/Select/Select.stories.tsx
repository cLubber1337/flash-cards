import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    options: [
      { id: 1, title: 'Account' },
      { id: 2, title: 'Password' },
      { id: 3, title: 'Register' },
      { id: 4, title: 'Information' },
    ],
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
  },
}
