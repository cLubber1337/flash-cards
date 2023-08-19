import { useCallback, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './CardsPage.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Pagination, TextField, Typography, TypographyVariant } from '@/components/ui'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { cardsActions } from '@/services/cards'
import {
  selectCardsCurrentPage,
  selectCardsItemsPerPage,
  selectCardsSearchByName,
  selectCardsSortBy,
} from '@/services/cards/selectors.ts'
import { useGetCardsOfDeckQuery } from '@/services/decks'
import { selectAuthorId, selectDeckCover } from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { AddNewCard } from '@/widgets/AddNewCard/ui/AddNewCard.tsx'
import { MyPackMenu } from '@/widgets/MyPackMenu/MyPackMenu.tsx'
import { TableCards } from '@/widgets/Table/TableCards/TableCards.tsx'

interface PackPageProps {}

export const CardsPage = ({}: PackPageProps) => {
  const dispatch = useAppDispatch()
  const { deckId } = useParams()
  const navigate = useNavigate()
  const itemsPerPage = useAppSelector(selectCardsItemsPerPage)
  const currentPage = useAppSelector(selectCardsCurrentPage)
  const searchByName = useAppSelector(selectCardsSearchByName)
  const sortBy = useAppSelector(selectCardsSortBy)
  const cover = useAppSelector(selectDeckCover)
  const authorId = useAppSelector(selectAuthorId)
  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''
  const { data: authMeData } = useMeQuery()

  const { data } = useGetCardsOfDeckQuery({
    id: deckId,
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    question: searchByName,
  })

  const isMyPack = authMeData?.id === authorId
  const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)

  const handleLearnPack = () => {
    navigate(`/decks/${deckId}/learn`)
  }

  const handleSetCurrentPage = useCallback(
    (page: number) => {
      dispatch(cardsActions.setCurrentPage(page))
    },
    [dispatch, cardsActions]
  )

  const handleSetItemsPerPage = useCallback(
    (itemsPerPage: number) => {
      dispatch(cardsActions.setItemsPerPage(itemsPerPage))
    },
    [dispatch, cardsActions]
  )

  return (
    <div className={s.packPage}>
      <AddNewCard isOpen={isOpenAddNewCard} onClose={setIsOpenAddNewCard} />
      <Link to={'/'} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>
      <div className={s.header}>
        <div className={s.title}>
          <Typography variant={TypographyVariant.Large}>
            {isMyPack ? 'My Pack' : "Friend's Pack"}
          </Typography>
          {isMyPack && <MyPackMenu onClickLearnPack={handleLearnPack} />}
        </div>
        {isMyPack ? (
          <Button onClick={() => setIsOpenAddNewCard(true)}>Add New Card</Button>
        ) : (
          <Button onClick={handleLearnPack}>Learn to Pack</Button>
        )}
      </div>
      <div className={s.deckImg}>
        <img src={cover ? cover : deckImg} alt="deck" className={s.img} />
      </div>

      {/*-------------------------------------SEARCH BAR-----------------------------------------*/}

      <div className={s.search}>
        <TextField
          placeholder="Search..."
          onChange={e => dispatch(cardsActions.setSearchByName(e))}
          value={searchByName}
          search
          fullWidth
        />
      </div>

      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      <TableCards sortBy={sortBy} data={data?.items} isMyPack={isMyPack} />

      {/*-------------------------------------PAGINATION------------------------------------------*/}
      <Pagination
        currentPage={currentPage}
        totalPages={data?.pagination.totalPages}
        siblingsCount={1}
        itemsPerPage={itemsPerPage}
        setCurrentPage={handleSetCurrentPage}
        setItemsPerPage={handleSetItemsPerPage}
      />
    </div>
  )
}
