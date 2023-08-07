import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { LoginForm } from '@/components/Auth/LoginForm'

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    )
  },
}
