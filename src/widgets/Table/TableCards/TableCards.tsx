import { memo, useCallback, useState } from 'react'

import { toast } from 'react-toastify'

import s from './TableCards.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { Grade } from '@/components/ui/Grade/Grade.tsx'
import { Card, cardsActions, useDeleteCardMutation, useGetCardQuery } from '@/services/cards'
import { SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { cardsHeaderColumns } from '@/utils/constants/cardsHeaderColumns.ts'
import { AddNewCard } from '@/widgets/AddNewCard'
import { TCell } from '@/widgets/Table/TCell/TCell.tsx'
import { THeader } from '@/widgets/Table/THeader/THeader.tsx'
import { TRow } from '@/widgets/Table/TRow/TRow.tsx'

interface TableCardsProps {
  data?: Card[]
  sortBy: SortByType | ''
  isMyPack: boolean
}

export const TableCards = memo(({ data, sortBy, isMyPack }: TableCardsProps) => {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)
  const [isOpenUpdateCardModal, setIsOpenUpdateCardModal] = useState(false)
  const [editModeCard, setEditModeCard] = useState(false)
  const [deleteCard, { isLoading: isLoadingDeleteCard }] = useDeleteCardMutation()
  const [cardId, setCardId] = useState('')
  const { data: card } = useGetCardQuery(
    {
      id: cardId,
    },
    { skip: cardId === '' }
  )

  const [cardQuestion, setCardQuestion] = useState('')
  const dispatch = useAppDispatch()

  const handleSortBy = useCallback(
    (sortBy: SortByType | '') => {
      dispatch(cardsActions.setSortBy(sortBy))
    },
    [dispatch]
  )

  const handleClickDeleteCard = useCallback(
    (id: string, cardName: string) => {
      setCardId(id)
      setIsOpenConfirmDelete(true)
      setCardQuestion(cardName)
    },
    [setCardId, setIsOpenConfirmDelete]
  )

  const handleDeleteCard = () => {
    toast
      .promise(deleteCard({ id: cardId! }).unwrap(), {
        pending: 'Deleting...',
        success: `The ${cardQuestion} was successfully deleted`,
        error: `The ${cardQuestion} was not deleted`,
      })
      .then(() => {
        setIsOpenConfirmDelete(false)
      })
      .catch(e => {
        toast.error(e.data.message)
      })
  }

  const handleClickToUpdateCard = (id: string) => {
    setCardId(id)
    setEditModeCard(true)
    setIsOpenUpdateCardModal(true)
  }

  return (
    <table className={s.table}>
      <THeader
        sortBy={sortBy}
        columns={cardsHeaderColumns}
        className={isMyPack ? s.myRow : s.friendsRow}
        setSortBy={handleSortBy}
      />

      <tbody>
        <ConfirmModal
          title="Delete Card"
          isOpen={isOpenConfirmDelete}
          setIsOpen={setIsOpenConfirmDelete}
          onAction={() => handleDeleteCard()}
          isLoading={isLoadingDeleteCard}
        >
          <p>Do you really want to remove {cardQuestion}?</p>
        </ConfirmModal>
        <AddNewCard
          isOpen={isOpenUpdateCardModal}
          onClose={setIsOpenUpdateCardModal}
          editMode={editModeCard}
          cardId={cardId}
          answer={card?.answer}
        />
        {data?.map(({ id, answer, question, updated, grade, answerImg, questionImg }) => {
          return (
            <TRow key={id} className={isMyPack ? s.myRow : s.friendsRow}>
              <TCell className={s.col_1}>
                {questionImg && (
                  <div className={s.cardImg}>
                    <img src={questionImg} alt="question" className={s.img} />
                  </div>
                )}
                <Typography variant={TypographyVariant.Body2} className={s.deckTitle}>
                  {question}
                </Typography>
              </TCell>
              <TCell className={s.col_1}>
                {answerImg && (
                  <div className={s.cardImg}>
                    <img src={answerImg} alt="question" className={s.img} />
                  </div>
                )}
                <Typography variant={TypographyVariant.Body2}>{answer}</Typography>
              </TCell>
              <TCell>
                <Typography tag="span" variant={TypographyVariant.Body2}>
                  {new Date(updated).toLocaleDateString('en-GB')}
                </Typography>
              </TCell>
              <TCell>
                <Grade grade={grade} />
              </TCell>
              {isMyPack && (
                <TCell>
                  <EditIcon onClick={() => handleClickToUpdateCard(id)} />
                  <TrashIcon onClick={() => handleClickDeleteCard(id, question)} />
                </TCell>
              )}
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
})
