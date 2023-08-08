import { useState } from 'react'

import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { TextField } from './TextField.tsx'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Input',
  },
}
export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    title: 'Input',
  },
}

export const Search = () => {
  const [value, setValue] = useState('')
  const handleChange = (newValue: any) => {
    setValue(newValue)
  }

  return (
    <TextField customValue={value} onChangeValue={handleChange} search placeholder="Search..." />
  )
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
    label: 'Password',
    type: 'password',
  },
}
export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    type: 'password',
  },
}
export const PasswordError: Story = {
  args: {
    value: 'password123',
    label: 'Password',
    type: 'password',
    errorMessage: 'Invalid password',
  },
}

export const DefaultError: Story = {
  args: {
    label: 'Login',
    disabled: false,
    value: 'em@il.@.wrong.com',
    errorMessage: 'Invalid email',
  },
}
