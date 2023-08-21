import { memo, useCallback, useState } from 'react'

import { toast } from 'react-toastify'

import s from './TableCards.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { Grade } from '@/components/ui/Grade/Grade.tsx'
import { Card, cardsActions, useDeleteCardMutation } from '@/services/cards'
import { SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { cardsHeaderColumns } from '@/utils/constants/cardsHeaderColumns.ts'
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
  const [deleteCard, { isLoading: isLoadingDeleteCard }] = useDeleteCardMutation()

  const [cardId, setCardId] = useState('')
  const [cardName, setCardName] = useState('')
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
      setCardName(cardName)
    },
    [setCardId, setIsOpenConfirmDelete]
  )

  const handleDeleteCard = () => {
    toast
      .promise(deleteCard({ id: cardId! }).unwrap(), {
        pending: 'Deleting...',
        success: `The ${cardName} was successfully deleted`,
        error: `The ${cardName} was not deleted`,
      })
      .then(() => {
        localStorage.clear()
        setIsOpenConfirmDelete(false)
      })
      .catch(e => {
        toast.error(e.data.message)
      })
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
          <p>Do you really want to remove {cardName}?</p>
        </ConfirmModal>
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
                  <EditIcon onClick={() => null} />
                  <TrashIcon onClick={() => handleClickDeleteCard(id, answer)} />
                </TCell>
              )}
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
})
