import type { StoryObj } from '@storybook/react'

import { ConfirmModal } from './ConfirmModal.tsx'

const meta = {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Are you sure?',
    isLoading: false,
    isOpen: true,
    setIsOpen: undefined,
    onAction: undefined,
    children: 'Are you sure?',
  },
}
