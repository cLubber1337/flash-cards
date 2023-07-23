import type { StoryObj } from '@storybook/react'

import { AddNewPack } from './AddNewPack.tsx'

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
