import { useCallback, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './CardsPage.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Pagination, TextField, Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { BlurhashImage } from '@/components/ui/Image/BlurhashImage.tsx'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { cardsActions, useCreateCardMutation, useGetCardsOfDeckQuery } from '@/services/cards'
import {
  selectCardsCurrentPage,
  selectCardsItemsPerPage,
  selectCardsSearchByName,
  selectCardsSortBy,
} from '@/services/cards/selectors.ts'
import { useDeleteDeckMutation, useGetDeckByIdQuery, useUpdateDeckMutation } from '@/services/decks'
import { selectAuthorId } from '@/services/decks/selectors.ts'
import { CreateDeckArgs } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
import { AddNewCardValues } from '@/widgets/AddNewCard/model/types/types.ts'
import { AddNewCard } from '@/widgets/AddNewCard/ui/AddNewCard.tsx'
import { AddNewPackValues } from '@/widgets/AddNewPack/model/types/types.ts'
import { EditPack } from '@/widgets/EditPack/EditPack.tsx'
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
  const authorId = useAppSelector(selectAuthorId)
  const orderBy = sortBy ? `${sortBy.key}-${sortBy.direction}` : ''
  const { data: authMeData } = useMeQuery()
  const {
    data,
    isLoading: isLoadingCards,
    isFetching: isFetchingCards,
    error,
    isError,
  } = useGetCardsOfDeckQuery({
    id: deckId,
    orderBy: orderBy,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    question: searchByName,
  })
  const [deleteDeck, { isLoading: isLoadingDeleteDeck }] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const { data: deckData } = useGetDeckByIdQuery({ id: deckId! })
  const [createCard] = useCreateCardMutation()

  const isEmptyPack = data?.items.length === 0
  const isMyPack = authMeData?.id === authorId

  const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenEditDeck, setIsOpenEditDeck] = useState(false)

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
  const handleDeleteDeck = () => {
    toast
      .promise(deleteDeck({ id: deckId! }).unwrap(), {
        pending: 'Deleting...',
        success: `The ${deckData?.name} was successfully deleted`,
        error: `The ${deckData?.name} was not deleted`,
      })
      .then(() => {
        localStorage.clear()
        setIsOpenConfirmModal(false)
        navigate('/')
      })
      .catch(e => {
        toast.error(e.data.message)
      })
  }
  const handleClickToDeleteDeck = () => {
    setIsOpenConfirmModal(true)
  }
  const handleClickToEditDeck = () => {
    setIsOpenEditDeck(true)
  }
  const handleClickToLearnDeck = () => {
    if (data?.items.length) {
      navigate(`/decks/${deckId}/learn`)
    } else {
      toast.warning('Sorry, the pack is still empty')
    }
  }

  const onSubmitEditDeck = ({ name, isPrivate, cover }: AddNewPackValues) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('isPrivate', String(isPrivate))
    cover[0] && formData.append('cover', cover[0])

    toast
      .promise(
        updateDeck({ id: deckId!, formData: formData as unknown as CreateDeckArgs }).unwrap(),
        {
          pending: 'Updating...',
          success: `The ${deckData?.name} was successfully updated`,
          error: `The ${deckData?.name} was not updated`,
        }
      )
      .then(() => {
        setIsOpenEditDeck(prev => !prev)
      })
      .catch(e => toast.error(e.data.message))
  }

  if (isError && 'status' in error && error?.status === 404) {
    toast.error('This page does not exist')

    return <Navigate to={'/'} />
  }

  const onSubmitAddNewCard = (data: AddNewCardValues) => {
    const form = new FormData()

    form.append('answer', data.answer)
    data.answerImg[0] && form.append('answerImg', data.answerImg[0])
    form.append('question', data.question)
    data.questionImg[0] && form.append('questionImg', data.questionImg[0])

    createCard({ id: deckId!, formData: form })
      .unwrap()
      .then(() => {
        setIsOpenAddNewCard(prev => !prev)
      })
      .catch(e => toast.error(e.data.message))
  }

  return (
    <div className={s.packPage}>
      {deckData && (
        <EditPack
          isOpen={isOpenEditDeck}
          onClose={setIsOpenEditDeck}
          onSubmit={onSubmitEditDeck}
          isPrivate={deckData.isPrivate}
          deckCoverImg={deckData.cover}
          deckName={deckData.name}
        />
      )}
      {isOpenAddNewCard && (
        <AddNewCard
          isOpen={isOpenAddNewCard}
          onClose={setIsOpenAddNewCard}
          onSubmit={onSubmitAddNewCard}
        />
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          title="Delete Pack"
          isOpen={isOpenConfirmModal}
          setIsOpen={setIsOpenConfirmModal}
          onAction={handleDeleteDeck}
          isLoading={isLoadingDeleteDeck}
        >
          <p>
            Do you really want to remove <span className={s.nameDeck}>{deckData?.name}</span>?
          </p>
          <p>All cards will be deleted. </p>
        </ConfirmModal>
      )}
      <Link
        to={'/'}
        className={s.linkBack}
        onClick={() => dispatch(cardsActions.setSearchByName(''))}
      >
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>

      <div className={s.header}>
        {isLoadingCards && <Loader />}
        {deckData ? (
          <div className={s.title}>
            <Typography variant={TypographyVariant.Large}>
              {isMyPack ? `"${deckData?.name}"` : `"${deckData?.name}"`}
            </Typography>

            {isMyPack && (
              <MyPackMenu
                onClickLearnPack={handleClickToLearnDeck}
                onClickDelete={handleClickToDeleteDeck}
                onClickEdit={handleClickToEditDeck}
              />
            )}
          </div>
        ) : (
          <Skeleton height={36} width={200} containerClassName="flex" />
        )}

        {isMyPack ? (
          <Button
            variant="tertiary"
            onClick={() => setIsOpenAddNewCard(true)}
            disabled={isLoadingCards}
          >
            Add New Card
          </Button>
        ) : (
          <Button
            style={{ display: data?.items.length ? 'block' : 'none' }}
            onClick={handleClickToLearnDeck}
            variant="tertiary"
            disabled={isLoadingCards}
          >
            Learn to Pack
          </Button>
        )}
      </div>

      <div className={s.deckImg}>
        {!data ? (
          <Skeleton height={107} className={s.img} containerClassName="flex" />
        ) : (
          <BlurhashImage
            src={deckData?.cover ? deckData.cover : deckImg}
            alt="deck"
            className={s.img}
            blurHeight={107}
            blurWidth={170}
          />
        )}
      </div>

      {/*-------------------------------------SEARCH BAR-----------------------------------------*/}

      <div className={s.search}>
        <TextField
          placeholder="Search..."
          onChange={e => dispatch(cardsActions.setSearchByName(e))}
          value={searchByName}
          disabled={isLoadingCards}
          search
          fullWidth
        />
      </div>

      {/*-------------------------------------TABLE DECKS-----------------------------------------*/}

      {data && !isEmptyPack && (
        <TableCards
          sortBy={sortBy}
          data={data?.items}
          isMyPack={isMyPack}
          isFetching={isFetchingCards}
        />
      )}

      {isEmptyPack && (
        <Typography tag="h2" className={s.emptyPack}>
          {searchByName ? 'No cards found' : 'Pack is empty'}
        </Typography>
      )}

      {/*-------------------------------------PAGINATION------------------------------------------*/}
      {!isEmptyPack && data && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.pagination.totalPages}
          siblingsCount={1}
          itemsPerPage={itemsPerPage}
          setCurrentPage={handleSetCurrentPage}
          setItemsPerPage={handleSetItemsPerPage}
          selectOptions={[
            { id: 1, title: '3' },
            { id: 2, title: '6' },
          ]}
        />
      )}
    </div>
  )
}
