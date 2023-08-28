import type { StoryObj } from '@storybook/react'

import { AddNewCard } from './AddNewCard.tsx'

import answerImg from '@/assets/img/deckImage.jpg'

const meta = {
  title: 'Widgets/AddNewCard',
  component: AddNewCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: () => {},
    isOpen: true,
  },
}

export const EditMode: Story = {
  args: {
    editMode: true,
    onSubmit: () => {},
    isOpen: true,
    answer: 'answer',
    question: 'question',
    answerImg: answerImg,
  },
}
