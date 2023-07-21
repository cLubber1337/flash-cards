import type { StoryObj } from '@storybook/react'

import { TabSwitcher } from './TabSwitcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tabs: ['Account', 'Password', 'Register', 'Information'],
    disabled: false,
    ariaLabel: 'Tab Switcher',
  },
}

export const DefaultDisabled: Story = {
  args: {
    tabs: ['Account', 'Password', 'Register', 'Information'],
    disabled: true,
    ariaLabel: 'Tab Switcher',
  },
}
