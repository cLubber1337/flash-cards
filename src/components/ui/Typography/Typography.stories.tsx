import type { StoryObj } from '@storybook/react'

import { TypographyVariant, Typography } from './Typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    fontStyle: TypographyVariant,
    tag: 'p',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Body1: Story = {
  args: {
    variant: TypographyVariant.Body1,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Body 1 Text</Typography>,
}

export const Body2: Story = {
  args: {
    variant: TypographyVariant.Body2,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Body 2 Text</Typography>,
}

export const Large: Story = {
  args: {
    variant: TypographyVariant.Large,
    tag: 'h1',
  },
  render: args => <Typography {...args}>This is Large Text</Typography>,
}
export const H1: Story = {
  args: {
    variant: TypographyVariant.H1,
    tag: 'h1',
  },
  render: args => <Typography {...args}>This is H1 Text</Typography>,
}

export const H2: Story = {
  args: {
    variant: TypographyVariant.H2,
    tag: 'h2',
  },
  render: args => <Typography {...args}>This is H2 Text</Typography>,
}

export const H3: Story = {
  args: {
    variant: TypographyVariant.H3,
    tag: 'h3',
  },
  render: args => <Typography {...args}>This is H3 Text</Typography>,
}

export const Subtitle1: Story = {
  args: {
    variant: TypographyVariant.Subtitle1,
    tag: 'h4',
  },
  render: args => <Typography {...args}>This is Subtitle 1 Text</Typography>,
}

export const Subtitle2: Story = {
  args: {
    variant: TypographyVariant.Subtitle2,
    tag: 'h5',
  },
  render: args => <Typography {...args}>This is Subtitle 2 Text</Typography>,
}

export const Caption: Story = {
  args: {
    variant: TypographyVariant.Caption,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Caption Text</Typography>,
}

export const Overline: Story = {
  args: {
    variant: TypographyVariant.Overline,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Overline Text</Typography>,
}

export const Link1: Story = {
  args: {
    variant: TypographyVariant.Link1,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Link 1 Text</Typography>,
}

export const Link2: Story = {
  args: {
    variant: TypographyVariant.Link2,
    tag: 'p',
  },
  render: args => <Typography {...args}>This is Link 2 Text</Typography>,
}
