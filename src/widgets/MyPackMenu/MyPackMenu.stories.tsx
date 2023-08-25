import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'

import { MyPackMenu } from './MyPackMenu.tsx'

const meta = {
  title: 'Widgets/MyPackMenu',
  component: MyPackMenu,
  args: {},
} satisfies Meta<typeof MyPackMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MyPackMenu
      onClickLearnPack={() => console.log('Learn')}
      onClickDelete={() => console.log('Delete')}
      onClickEdit={() => console.log('Edit')}
    />
  ),
}
