import type { StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'

import { TableDecks } from './TableDecks.tsx'

import { Deck } from '@/services/decks'
import { store } from '@/services/store.ts'

const meta = {
  title: 'Widgets/Table',
  component: TableDecks,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

const tableData: Deck[] = [
  {
    id: 'cllplse0807qqvo2qxoxkrn6l',
    userId: 'f4333448-5615-447f-beca-5893d431d8fe',
    name: 'Топ слов на английском',
    isPrivate: false,
    shots: 0,
    cover: null,
    rating: 0,
    isDeleted: null,
    isBlocked: null,
    created: '2023-08-24T20:15:25.929Z',
    updated: '2023-08-24T20:20:26.325Z',
    cardsCount: 1,
    author: {
      id: 'f4333448-5615-447f-beca-5893d431d8fe',
      name: 'Antoniv',
    },
  },
  {
    id: 'cllpefqyo07j9vo2qe7cvwgut',
    userId: '40ba7c7e-324d-40d0-9e9f-94f1b3f42b63',
    name: 'Вопросы по JS',
    isPrivate: false,
    shots: 0,
    cover: null,
    rating: 0,
    isDeleted: null,
    isBlocked: null,
    created: '2023-08-24T16:49:38.880Z',
    updated: '2023-08-24T19:55:20.216Z',
    cardsCount: 8,
    author: {
      id: '40ba7c7e-324d-40d0-9e9f-94f1b3f42b63',
      name: 'zaitsev',
    },
  },
  {
    id: 'cllpklo1507qdvo2qfssb4fkq',
    userId: 'a51fe7a4-6392-48fa-80cc-507b765560f3',
    name: 'Веселые вопросы',
    isPrivate: false,
    shots: 0,
    cover: null,
    rating: 0,
    isDeleted: null,
    isBlocked: null,
    created: '2023-08-24T19:42:12.713Z',
    updated: '2023-08-24T19:42:12.713Z',
    cardsCount: 0,
    author: {
      id: 'a51fe7a4-6392-48fa-80cc-507b765560f3',
      name: 'ULTRA_XAKER',
    },
  },
]

export const Primary: Story = {
  args: {
    data: tableData,
    sortBy: '',
    isFetching: false,
  },
  render: () => (
    <Provider store={store}>
      <TableDecks sortBy={''} data={tableData} isFetching={false} />
    </Provider>
  ),
}
