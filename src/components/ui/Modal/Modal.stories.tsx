import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { Modal } from './Modal.tsx'

import { Card } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    children: <Card>Modal</Card>,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}
