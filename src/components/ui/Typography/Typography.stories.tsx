import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { TypographyVariant, Typography } from './Typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const Body1: Story = {
  args: {
    variant: TypographyVariant.Body1,
    children: 'This is Body 1 Text',
    tag: 'p',
  },
}

export const Body2: Story = {
  args: {
    variant: TypographyVariant.Body2,
    tag: 'p',
    children: 'This is Body 2 Text',
  },
}

export const Large: Story = {
  args: {
    variant: TypographyVariant.Large,
    tag: 'h1',
    children: 'This is Large Text',
  },
}
export const H1: Story = {
  args: {
    variant: TypographyVariant.H1,
    tag: 'h1',
    children: 'This is H1 Text',
  },
}

export const H2: Story = {
  args: {
    variant: TypographyVariant.H2,
    tag: 'h2',
    children: 'This is H2 Text',
  },
}

export const H3: Story = {
  args: {
    variant: TypographyVariant.H3,
    tag: 'h3',
    children: 'This is H3 Text',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: TypographyVariant.Subtitle1,
    tag: 'h4',
    children: 'This is Subtitle 1 Text',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: TypographyVariant.Subtitle2,
    tag: 'h5',
    children: 'This is Subtitle 2 Text',
  },
}

export const Caption: Story = {
  args: {
    variant: TypographyVariant.Caption,
    tag: 'p',
    children: 'This is Caption Text',
  },
}

export const Overline: Story = {
  args: {
    variant: TypographyVariant.Overline,
    tag: 'p',
    children: 'This is Overline Text',
  },
}

export const Link1: Story = {
  args: {
    variant: TypographyVariant.Link1,
    tag: 'p',
    children: 'This is Link 1 Text',
  },
}

export const Link2: Story = {
  args: {
    variant: TypographyVariant.Link2,
    tag: 'p',
    children: 'This is Link 2 Text',
  },
}
