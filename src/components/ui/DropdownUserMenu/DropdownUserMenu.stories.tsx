import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { DropdownUserMenu } from '@/components/ui'

const meta = {
  title: 'Components/DropdownUserMenu',
  component: DropdownUserMenu,
  tags: ['autodocs'],
  args: {
    userData: {
      name: 'John DoeDoe',
      email: 'JohnDoe666@ya.com',
    },
  },
} satisfies Meta<typeof DropdownUserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DropdownUserMenu {...args} />
      </div>
    )
  },
}
