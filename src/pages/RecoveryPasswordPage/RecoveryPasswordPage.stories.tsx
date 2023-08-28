import type { StoryObj } from '@storybook/react'

import { RecoveryPasswordPage } from './RecoveryPasswordPage.tsx'

const meta = {
  title: 'Pages/RecoveryPasswordPage',
  component: RecoveryPasswordPage,
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
