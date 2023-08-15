import type { StoryObj } from '@storybook/react'

import { AddNewPack } from '@/widgets/AddNewPack'

const meta = {
  title: 'Widgets/AddNewPack',
  component: AddNewPack,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
