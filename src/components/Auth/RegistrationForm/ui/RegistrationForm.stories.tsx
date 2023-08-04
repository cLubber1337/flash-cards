import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { RegistrationForm } from '@/components/Auth/RegistrationForm'

const meta = {
  title: 'Auth/RegistrationForm',
  component: RegistrationForm,
  tags: ['autodocs'],
} satisfies Meta<typeof RegistrationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    )
  },
}
