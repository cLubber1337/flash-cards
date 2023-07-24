import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { RadioGroup } from './RadioGroup.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    items: [
      { id: 1, title: 'Picture' },
      { id: 2, title: 'Video' },
      { id: 3, title: 'Audio' },
      { id: 4, title: 'Document' },
    ],
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
