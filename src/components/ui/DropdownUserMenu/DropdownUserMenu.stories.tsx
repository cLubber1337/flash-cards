import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { DropdownUserMenu } from '@/components/ui'
import { store } from '@/services/store.ts'

const meta = {
  title: 'Components/DropdownUserMenu',
  component: DropdownUserMenu,
  tags: ['autodocs'],
  args: {
    userData: {
      name: 'John DoeDoe',
      email: 'JohnDoe666@ya.com',
      avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      id: '123',
      created: JSON.stringify(new Date()),
      updated: JSON.stringify(new Date()),
      isEmailVerified: false,
    },
  },
} satisfies Meta<typeof DropdownUserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Provider store={store}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DropdownUserMenu {...meta.args} />
        </div>
      </Provider>
    )
  },
}
