import { useCallback, useState } from 'react'

import s from './DecksPage.module.scss'

import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import {
  Button,
  Pagination,
  Slider,
  TabSwitcher,
  TextField,
  Typography,
  TypographyVariant,
} from '@/components/ui'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { useGetDecksQuery } from '@/services/decks'
import { decksActions } from '@/services/decks/decksSlice.ts'
import {
  selectCurrentPage,
  selectItemsPerPage,
  selectNumberOfCards,
  selectSearchByName,
  selectSortBy,
} from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { decksPageTabOptions, DecksPageTabValues } from '@/utils/constants'
import { AddNewPack } from '@/widgets/AddNewPack'
import { TableDecks } from '@/widgets/Table'

export const DecksPage = () => {
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const searchByName = useAppSelector(selectSearchByName)
  const sortBy = useAppSelector(selectSortBy)
  const numberOfCards = useAppSelector(selectNumberOfCards)
  const [isOpen, setIsOpen] = useState(false)
  const [authorId, setAuthorId] = useState('')

  const { data: authMeData } = useMeQuery()

  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''

  const { data, isLoading: isLoadingDecks } = useGetDecksQuery({
    itemsPerPage,
    name: searchByName,
    currentPage: authorId ? 1 : currentPage,
    orderBy,
    minCardsCount: numberOfCards[0],
    maxCardsCount: numberOfCards[1],
    authorId,
  })

  const setCurrentPageHandler = useCallback(
    (page: number) => {
      dispatch(decksActions.setCurrentPage(page))
    },
    [dispatch, decksActions]
  )

  const setItemsPerPageHandler = useCallback(
    (itemsPerPage: number) => {
      dispatch(decksActions.setItemsPerPage(itemsPerPage))
    },
    [dispatch, decksActions]
  )

  const openModalAddNewPack = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const filterDecksByAuthorId = useCallback(
    (tabValue: string) => {
      if (tabValue === DecksPageTabValues.My) {
        setAuthorId(authMeData?.id || '')
      } else {
        setAuthorId('')
      }
    },
    [setAuthorId, authMeData]
  )

  const handleSliderChange = useCallback(
    (value: [number, number]) => {
      dispatch(decksActions.setNumberOfCards(value))
      dispatch(decksActions.setCurrentPage(1))
    },
    [dispatch, decksActions]
  )

  const handleClearFilters = () => {
    dispatch(decksActions.setSearchByName(''))
    dispatch(decksActions.setSortBy(''))
    dispatch(decksActions.setCurrentPage(1))
    dispatch(decksActions.setNumberOfCards([0, 20]))
  }

  return (
    <div className={s.decksPage}>
      <div className={s.header}>
        <div className={s.title}>
          <Typography tag="h1" variant={TypographyVariant.Large}>
            Packs list
          </Typography>
        </div>
        <Button className={s.AddNewPackBtn} onClick={openModalAddNewPack}>
          Add New Pack
        </Button>
        <AddNewPack isOpen={isOpen} onClose={setIsOpen} />
      </div>
      <div className={s.actions}>
        <div className={s.search}>
          <TextField
            placeholder="Search by name"
            search
            fullWidth
            value={searchByName}
            onChange={e => dispatch(decksActions.setSearchByName(e))}
            disabled={isLoadingDecks}
          />
        </div>
        <div className={s.tabSwitcher}>
          <Typography variant={TypographyVariant.Body2}>Show packs cards</Typography>
          <TabSwitcher
            tabs={decksPageTabOptions}
            onClick={filterDecksByAuthorId}
            disabled={isLoadingDecks}
            defaultValue={DecksPageTabValues.All}
          />
        </div>
        <div className={s.slider}>
          <Typography variant={TypographyVariant.Body2}>Number of cards</Typography>
          <Slider
            defaultValue={numberOfCards}
            min={0}
            max={20}
            step={1}
            onValueChange={v => handleSliderChange(v)}
          />
        </div>
        <Button
          variant="secondary"
          className={s.clearBtn}
          onClick={handleClearFilters}
          disabled={isLoadingDecks}
        >
          <TrashIcon />
          Clear Filter
        </Button>
      </div>
      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      <TableDecks data={data?.items} sortBy={sortBy} />

      {/*-------------------------------------PAGINATION------------------------------------------*/}

      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages}
        siblingsCount={1}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPageHandler}
        setItemsPerPage={setItemsPerPageHandler}
      />
    </div>
  )
}
