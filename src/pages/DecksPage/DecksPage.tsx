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
  const [isOpenAddNewDeck, setIsOpenAddNewDeck] = useState(false)
  const [authorId, setAuthorId] = useState('')
  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''

  const { data: authMeData } = useMeQuery()
  const {
    data,
    isLoading: isLoadingDecks,
    isFetching: isFetchingDecks,
  } = useGetDecksQuery({
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
    setIsOpenAddNewDeck(prevState => !prevState)
  }, [setIsOpenAddNewDeck])

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

  const onChangeSearchByName = useCallback(
    (value: string) => {
      dispatch(decksActions.setSearchByName(value))
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
        <Button className={s.AddNewPackBtn} onClick={openModalAddNewPack} disabled={isLoadingDecks}>
          Add New Pack
        </Button>
        {isOpenAddNewDeck && <AddNewPack isOpen={isOpenAddNewDeck} onClose={setIsOpenAddNewDeck} />}
      </div>
      <div className={s.actions}>
        <div className={s.search}>
          <TextField
            placeholder="Search by name"
            search
            fullWidth
            value={searchByName}
            onChange={onChangeSearchByName}
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
      {data && data.items.length === 0 && (
        <div className={s.noDecks}>
          <Typography className={s.noDecksTitle}>No pack of cards found</Typography>
        </div>
      )}

      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      {data?.items.length! > 0 && (
        <TableDecks data={data?.items} sortBy={sortBy} isFetching={isFetchingDecks} />
      )}

      {/*-------------------------------------PAGINATION------------------------------------------*/}

      {data?.items.length! > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.pagination.totalPages}
          siblingsCount={1}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPageHandler}
          setItemsPerPage={setItemsPerPageHandler}
          selectOptions={[
            { id: 1, title: '3' },
            { id: 2, title: '5' },
            { id: 3, title: '8' },
          ]}
        />
      )}
    </div>
  )
}
