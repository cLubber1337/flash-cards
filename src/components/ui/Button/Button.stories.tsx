import type { StoryObj } from '@storybook/react'

import { ReactComponent as LogoutIcon } from '../../../assets/svg/logoutIcon.svg'

import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: true,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}

export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: true,
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const TertiaryDisabled: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: true,
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
}

export const LinkDisabled: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: true,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
    href: 'https://google.com',
  },
}

export const LogoutButton: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
    children: (
      <>
        <LogoutIcon />
        Logout
      </>
    ),
  },
}
