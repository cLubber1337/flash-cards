import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { UserMenu } from './UserMenu.tsx'

const meta = {
  title: 'Widgets/UserMenu',
  component: UserMenu,
  args: {
    userData: {
      name: 'John DoeD',
      email: 'jDJohnDoeD@jd.com',
    },
  },
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
