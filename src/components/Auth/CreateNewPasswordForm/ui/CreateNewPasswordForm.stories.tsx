import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '@/components/Auth/CreateNewPasswordForm'

const meta = {
  title: 'Auth/CreateNewPasswordForm',
  component: CreateNewPasswordForm,
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
