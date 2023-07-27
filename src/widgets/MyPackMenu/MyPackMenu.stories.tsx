import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { MyPackMenu } from './MyPackMenu.tsx'

const meta = {
  title: 'Widgets/MyPackMenu',
  component: MyPackMenu,
  args: {
    userData: {
      name: 'John DoeD',
      email: 'jDJohnDoeD@jd.com',
    },
  },
} satisfies Meta<typeof MyPackMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
