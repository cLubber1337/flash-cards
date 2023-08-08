import type { StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    id: 'c3',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

export const WithText: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledWithText: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
  },
}

export const DisabledCheckedWithText: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
    defaultChecked: true,
  },
}
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}
