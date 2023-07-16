import type { StoryObj } from '@storybook/react'

import { Input } from './Input.tsx'

const meta = {
  title: 'Components/Input',
  component: Input,
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
    title: 'Input',
  },
}
export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    title: 'Input',
  },
}

export const Search: Story = {
  args: {
    disabled: false,
    search: true,
    value: 'Search',
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    search: true,
    value: 'Search',
  },
}

export const Password: Story = {
  args: {
    disabled: false,
    type: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    type: 'password',
  },
}

export const DefaultError: Story = {
  args: {
    title: 'Input',
    disabled: false,
    value: 'em@il.@.wrong.com',
    error: 'Invalid email',
  },
}
