import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { UserDropdownMenu } from './UserDropdownMenu.tsx'

const meta = {
  title: 'Widgets/UserDropdownMenu',
  component: UserDropdownMenu,
  tags: ['autodocs'],
  args: {
    userData: {
      name: 'John DoeD',
      email: 'jDJohnDoeD@jd.com',
    },
  },
} satisfies Meta<typeof UserDropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
