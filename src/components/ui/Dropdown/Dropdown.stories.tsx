import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { Dropdown } from './Dropdown.tsx'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
