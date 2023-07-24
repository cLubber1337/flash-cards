import type { StoryObj } from '@storybook/react'

import { TabSwitcher } from './TabSwitcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  args: {
    tabs: ['Account', 'Password', 'Register', 'Information'],
    ariaLabel: 'Tab Switcher',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
