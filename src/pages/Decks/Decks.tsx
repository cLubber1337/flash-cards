import { useState } from 'react'

import { Button, TextField } from '@/components/ui'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksActions } from '@/services/decks/decksSlice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { Table } from '@/widgets/Table'

export const Decks = () => {
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const searchByName = useAppSelector(state => state.decks.searchByName)
  const [cardName, setCardName] = useState('')

  const { data } = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
    name: searchByName,
    currentPage: currentPage,
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const handleCreateDeck = () => createDeck({ name: cardName })

  return (
    <div>
      <TextField
        value={searchByName}
        onChange={e => dispatch(decksActions.setSearchByName(e.currentTarget.value))}
        search
      />
      <Button onClick={() => dispatch(decksActions.setItemsPerPage(5))}>iPP: 5</Button>
      <Button onClick={() => dispatch(decksActions.setItemsPerPage(10))}>iPP: 10</Button>
      <Button onClick={() => dispatch(decksActions.setItemsPerPage(15))}>iPP: 15</Button>
      <Table data={data?.items} />
      <TextField onChangeValue={e => setCardName(e)} />
      {isCreateDeckLoading && 'Loading...'}
      <Button onClick={handleCreateDeck}>Create deck</Button>
    </div>
  )
}
