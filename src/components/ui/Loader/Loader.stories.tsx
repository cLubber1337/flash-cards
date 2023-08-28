import type { StoryObj } from '@storybook/react'

import { Loader } from './Loader.tsx'

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const WithOverlay: Story = {
  args: {
    overlay: true,
  },
}
