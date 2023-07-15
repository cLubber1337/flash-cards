import type { StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    text: 'Accept terms and conditions.',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

export const DefaultChecked: Story = {
  args: {
    disabled: false,
    defaultChecked: true,
  },
}

export const DefaultWithText: Story = {
  args: {
    text: 'Accept terms and conditions',
    disabled: false,
  },
}
export const DefaultCheckedWithText: Story = {
  args: {
    text: 'Accept terms and conditions',
    disabled: false,
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledWithText: Story = {
  args: {
    text: 'Accept terms and conditions',
    disabled: true,
  },
}

export const DisabledCheckedWithText: Story = {
  args: {
    text: 'Accept terms and conditions',
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
