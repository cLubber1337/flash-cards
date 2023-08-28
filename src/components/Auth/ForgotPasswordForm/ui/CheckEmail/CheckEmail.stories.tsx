import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './CheckEmail.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
