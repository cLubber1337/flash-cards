import type { StoryObj } from '@storybook/react'

import { Table } from './Table.tsx'

const meta = {
  title: 'Widgets/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithAuth: Story = {
  args: {},
}
