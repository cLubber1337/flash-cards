import { Link } from 'react-router-dom'

import s from './CardsPage.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Pagination, TextField, Typography, TypographyVariant } from '@/components/ui'
import { cardsActions } from '@/services/cards'
import {
  selectCardsCurrentPage,
  selectCardsItemsPerPage,
  selectCardsSearchByName,
  selectCardsSortBy,
} from '@/services/cards/selectors.ts'
import { useGetCardsOfDeckQuery } from '@/services/decks'
import { selectDeckId } from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { MyPackMenu } from '@/widgets/MyPackMenu/MyPackMenu.tsx'
import { TableCards } from '@/widgets/Table/TableCards/TableCards.tsx'

interface PackPageProps {}

export const CardsPage = ({}: PackPageProps) => {
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(selectCardsItemsPerPage)
  const currentPage = useAppSelector(selectCardsCurrentPage)
  const searchByName = useAppSelector(selectCardsSearchByName)
  const sortBy = useAppSelector(selectCardsSortBy)
  const deckId = useAppSelector(selectDeckId)
  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''

  const { data } = useGetCardsOfDeckQuery({
    id: deckId,
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    question: searchByName,
  })

  return (
    <div className={s.packPage}>
      <Link to={'/'} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>
      <div className={s.header}>
        <div className={s.title}>
          <Typography variant={TypographyVariant.Large}>My Pack</Typography>
          <MyPackMenu />
        </div>
        <Button onClick={() => null}>Learn to Pack</Button>
      </div>
      <div className={s.deckImg}>
        <img src={deckImg} alt="deck" className={s.img} />
      </div>

      {/*-------------------------------------SEARCH BAR-----------------------------------------*/}

      <div className={s.search}>
        <TextField
          placeholder="Search..."
          onChangeValue={e => dispatch(cardsActions.setSearchByName(e))}
          customValue={searchByName}
          search
          fullWidth
        />
      </div>

      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      <TableCards sortBy={sortBy} data={data?.items} />

      {/*-------------------------------------PAGINATION------------------------------------------*/}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages}
        siblingsCount={1}
        itemsPerPage={itemsPerPage}
        setCurrentPage={page => dispatch(cardsActions.setCurrentPage(page))}
        setItemsPerPage={itemsPerPage => dispatch(cardsActions.setItemsPerPage(itemsPerPage))}
      />
    </div>
  )
}
