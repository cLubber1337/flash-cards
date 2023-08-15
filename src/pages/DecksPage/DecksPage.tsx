import { useCallback, useState } from 'react'

import { ReactComponent as TrashIcon } from '../../assets/svg/trash.svg'

import s from './DecksPage.module.scss'

import {
  Button,
  Pagination,
  Slider,
  TabSwitcher,
  TextField,
  Typography,
  TypographyVariant,
} from '@/components/ui'
import { useGetDecksQuery } from '@/services/decks'
import { decksActions } from '@/services/decks/decksSlice.ts'
import {
  selectCurrentPage,
  selectItemsPerPage,
  selectSearchByName,
  selectSortBy,
} from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { AddNewPack } from '@/widgets/AddNewPack'
import { TableDecks } from '@/widgets/Table'

export const DecksPage = () => {
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(selectItemsPerPage)
  const currentPage = useAppSelector(selectCurrentPage)
  const searchByName = useAppSelector(selectSearchByName)
  const sortBy = useAppSelector(selectSortBy)
  const [isOpen, setIsOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 20])

  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''

  const { data } = useGetDecksQuery({
    itemsPerPage: itemsPerPage,
    name: searchByName,
    currentPage: currentPage,
    orderBy: orderBy,
    minCardsCount: sliderValue[0],
    maxCardsCount: sliderValue[1],
  })

  const handleClearFilters = () => {
    dispatch(decksActions.setSearchByName(''))
    dispatch(decksActions.setSortBy(''))
    dispatch(decksActions.setCurrentPage(1))
    setSliderValue([0, 20])
  }

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

  return (
    <div className={s.decksPage}>
      <div className={s.header}>
        <div className={s.title}>
          <Typography tag="h1" variant={TypographyVariant.Large}>
            Packs list
          </Typography>
        </div>
        <Button className={s.AddNewPackBtn} onClick={() => setIsOpen(true)}>
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
          />
        </div>
        <div className={s.tabSwitcher}>
          <Typography variant={TypographyVariant.Body2}>Show packs cards</Typography>
          <TabSwitcher tabs={['My Cards', 'All Cards']} onClick={() => null} />
        </div>
        <div className={s.slider}>
          <Typography variant={TypographyVariant.Body2}>Number of cards</Typography>
          <Slider
            defaultValue={sliderValue}
            min={0}
            max={20}
            step={1}
            onValueChange={setSliderValue}
          />
        </div>
        <Button variant="secondary" className={s.clearBtn} onClick={handleClearFilters}>
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
