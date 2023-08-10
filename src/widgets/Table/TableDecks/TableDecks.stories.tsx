import type { StoryObj } from '@storybook/react'

import { TableDecks } from './TableDecks.tsx'

const meta = {
  title: 'Widgets/Table',
  component: TableDecks,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithAuth: Story = {
  args: {},
}
