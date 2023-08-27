import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { Slider } from './Slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    step: 1,
    minStepsBetweenThumbs: 10,
    defaultValue: [0, 100],
    value: [0, 100],
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
