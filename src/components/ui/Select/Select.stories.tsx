import type { StoryObj } from '@storybook/react'

import { Select } from './Select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { id: 1, title: 'Account' },
      { id: 2, title: 'Password' },
      { id: 3, title: 'Register' },
      { id: 4, title: 'Information' },
    ],
    fullWidth: false,
    disabled: false,
  },
}

export const DefaultDisabled: Story = {
  args: {
    items: [
      { id: 1, title: 'Account' },
      { id: 2, title: 'Password' },
      { id: 3, title: 'Register' },
      { id: 4, title: 'Information' },
    ],
    fullWidth: false,
    disabled: true,
  },
}
