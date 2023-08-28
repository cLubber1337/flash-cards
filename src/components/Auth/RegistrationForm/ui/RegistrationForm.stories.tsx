import type { Meta, StoryObj } from '@storybook/react'

import { RegistrationForm } from '@/components/Auth/RegistrationForm'

const meta = {
  title: 'Auth/RegistrationForm',
  component: RegistrationForm,
} satisfies Meta<typeof RegistrationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
