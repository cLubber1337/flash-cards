import { useCallback, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './CardsPage.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Pagination, TextField, Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { cardsActions } from '@/services/cards'
import {
  selectCardsCurrentPage,
  selectCardsItemsPerPage,
  selectCardsSearchByName,
  selectCardsSortBy,
} from '@/services/cards/selectors.ts'
import { useDeleteDeckMutation, useGetCardsOfDeckQuery } from '@/services/decks'
import { selectAuthorId, selectDeckCover, selectDeckName } from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { AddNewCard } from '@/widgets/AddNewCard/ui/AddNewCard.tsx'
import { MyPackMenu } from '@/widgets/MyPackMenu/MyPackMenu.tsx'
import { TableCards } from '@/widgets/Table/TableCards/TableCards.tsx'

export const CardsPage = () => {
  const dispatch = useAppDispatch()
  const { deckId } = useParams()
  const navigate = useNavigate()
  const itemsPerPage = useAppSelector(selectCardsItemsPerPage)
  const currentPage = useAppSelector(selectCardsCurrentPage)
  const searchByName = useAppSelector(selectCardsSearchByName)
  const sortBy = useAppSelector(selectCardsSortBy)
  const cover = useAppSelector(selectDeckCover)
  const authorId = useAppSelector(selectAuthorId)
  const deckName = useAppSelector(selectDeckName) ? useAppSelector(selectDeckName) : 'Friend'
  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''
  const { data: authMeData } = useMeQuery()
  const { data, isLoading: isLoadingCards } = useGetCardsOfDeckQuery({
    id: deckId,
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    question: searchByName,
  })
  const [deleteDeck, { isLoading: isLoadingDeleteDeck }] = useDeleteDeckMutation()

  const isMyPack = authMeData?.id === authorId
  const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const handleLearnPack = () => {
    if (data?.items.length) {
      navigate(`/decks/${deckId}/learn`)
    } else {
      toast.warning('Sorry, the pack is still empty')
    }
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
  const handleDeleteDeck = async () => {
    await deleteDeck({ id: deckId! })
  }
  const handleClickToDeleteDeck = () => {
    setIsOpenConfirmModal(true)
  }

  return (
    <div className={s.packPage}>
      <AddNewCard isOpen={isOpenAddNewCard} onClose={setIsOpenAddNewCard} />
      <ConfirmModal
        title="Delete Pack"
        isOpen={isOpenConfirmModal}
        setIsOpen={setIsOpenConfirmModal}
        onAction={handleDeleteDeck}
        isLoading={isLoadingDeleteDeck}
      >
        <p>
          Do you really want to remove <span className={s.nameDeck}>{deckName}</span>?
        </p>
        <p>All cards will be deleted. </p>
      </ConfirmModal>
      <Link to={'/'} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>
      <div className={s.header}>
        <div className={s.title}>
          <Typography variant={TypographyVariant.Large}>
            {isMyPack ? 'My Pack' : `${deckName}'s Pack`}
          </Typography>
          {isMyPack && (
            <MyPackMenu
              onClickLearnPack={handleLearnPack}
              onClickDelete={handleClickToDeleteDeck}
            />
          )}
        </div>
        {isMyPack ? (
          <Button onClick={() => setIsOpenAddNewCard(true)}>Add New Card</Button>
        ) : (
          <Button
            style={{ display: data?.items.length ? 'block' : 'none' }}
            onClick={handleLearnPack}
          >
            Learn to Pack
          </Button>
        )}
      </div>
      <div className={s.deckImg}>
        <img src={cover ? cover : deckImg} alt="deck" className={s.img} />
      </div>

      {/*-------------------------------------SEARCH BAR-----------------------------------------*/}

      {!!data?.items.length && (
        <div className={s.search}>
          <TextField
            placeholder="Search..."
            onChange={e => dispatch(cardsActions.setSearchByName(e))}
            value={searchByName}
            search
            fullWidth
          />
        </div>
      )}

      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      {isLoadingCards ? (
        <Loader />
      ) : data?.items.length ? (
        <TableCards sortBy={sortBy} data={data?.items} isMyPack={isMyPack} />
      ) : (
        <Typography tag="h2" variant={TypographyVariant.Large} className={s.emptyPack}>
          Pack is empty
        </Typography>
      )}

      {/*-------------------------------------PAGINATION------------------------------------------*/}
      {!!data?.items.length && (
        <Pagination
          currentPage={currentPage}
          totalPages={data?.pagination.totalPages}
          siblingsCount={1}
          itemsPerPage={itemsPerPage}
          setCurrentPage={handleSetCurrentPage}
          setItemsPerPage={handleSetItemsPerPage}
        />
      )}
    </div>
  )
}
