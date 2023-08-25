import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { store } from '@/services/store.ts'
import { AddNewPack } from '@/widgets/AddNewPack'

const meta = {
  title: 'Widgets/AddNewPack',
  component: AddNewPack,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

function handleIsOpen(isOpen: boolean): void {
  if (isOpen) {
    console.log('The component is open')
  } else {
    console.log('The component is closed')
  }
}

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: handleIsOpen,
  },
  render: () => (
    <Provider store={store}>
      <AddNewPack onClose={handleIsOpen} isOpen={true} />
    </Provider>
  ),
}
