import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { Modal } from './Modal.tsx'

import { Card } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    children: (
      <Card style={{ width: '300px', padding: '20px' }}>
        LOrem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        laboris, nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Card>
    ),
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}
