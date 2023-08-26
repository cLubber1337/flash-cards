import { memo, useCallback, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

import s from './TableCards.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { Typography, TypographyVariant } from '@/components/ui'
import { ConfirmModal } from '@/components/ui/ConfirmModal/ConfirmModal.tsx'
import { Grade } from '@/components/ui/Grade/Grade.tsx'
import { BlurhashImage } from '@/components/ui/Image/BlurhashImage.tsx'
import { Card, cardsActions, useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards'
import { SortByType } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'
import { cardsHeaderColumns } from '@/utils/constants/cardsHeaderColumns.ts'
import { AddNewCard } from '@/widgets/AddNewCard'
import { AddNewCardValues } from '@/widgets/AddNewCard/model/types/types.ts'
import { TCell } from '@/widgets/Table/TCell/TCell.tsx'
import { THeader } from '@/widgets/Table/THeader/THeader.tsx'
import { TRow } from '@/widgets/Table/TRow/TRow.tsx'
import 'react-loading-skeleton/dist/skeleton.css'

interface TableCardsProps {
  data?: Card[]
  sortBy: SortByType | ''
  isMyPack: boolean
  isFetching: boolean
}

export const TableCards = memo(({ data, sortBy, isMyPack, isFetching }: TableCardsProps) => {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)
  const [isOpenUpdateCardModal, setIsOpenUpdateCardModal] = useState(false)
  const [editModeCard, setEditModeCard] = useState(false)
  const [deleteCard, { isLoading: isLoadingDeleteCard }] = useDeleteCardMutation()
  const [cardId, setCardId] = useState('')
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')

  const [updateCard] = useUpdateCardMutation()

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

  const handleClickToUpdateCard = (
    id: string,
    answer: string,
    question: string,
    questionImg: string,
    answerImg: string
  ) => {
    setCardId(id)
    setQuestion(question)
    setAnswer(answer)
    setQuestionImg(questionImg)
    setAnswerImg(answerImg)
    setEditModeCard(true)
    setIsOpenUpdateCardModal(true)
  }

  const onSubmit = (data: AddNewCardValues) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    data.answerImg[0] && formData.append('answerImg', data.answerImg[0])
    formData.append('question', data.question)
    data.questionImg[0] && formData.append('questionImg', data.questionImg[0])

    toast
      .promise(updateCard({ id: cardId!, formData }).unwrap(), {
        pending: 'Updating...',
        success: 'The card was successfully updated',
        error: 'The card was not updated',
      })
      .then(() => {
        setIsOpenUpdateCardModal(false)
      })
      .catch(e => toast.error(e.data.message))
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
        {isOpenUpdateCardModal && (
          <AddNewCard
            editMode={editModeCard}
            isOpen={isOpenUpdateCardModal}
            onClose={setIsOpenUpdateCardModal}
            onSubmit={onSubmit}
            answer={answer}
            question={question}
            questionImg={questionImg}
            answerImg={answerImg}
          />
        )}
        {data?.map(({ id, answer, question, updated, grade, answerImg, questionImg }) => {
          return (
            <TRow key={id} className={isMyPack ? s.myRow : s.friendsRow}>
              <TCell className={s.col_1}>
                {questionImg && (
                  <div className={s.cardImg}>
                    {isFetching ? (
                      <Skeleton width={120} height={44} containerClassName="flex" />
                    ) : (
                      <BlurhashImage
                        src={questionImg}
                        alt="question"
                        className={s.img}
                        blurHeight={44}
                        blurWidth={120}
                      />
                    )}
                  </div>
                )}
                {isFetching ? (
                  <Skeleton width={200} height={24} containerClassName="flex" />
                ) : (
                  <Typography variant={TypographyVariant.Body2} className={s.deckTitle}>
                    {question}
                  </Typography>
                )}
              </TCell>
              <TCell className={s.col_1}>
                {answerImg && (
                  <div className={s.cardImg}>
                    {isFetching ? (
                      <Skeleton width={120} height={44} containerClassName="flex" />
                    ) : (
                      <BlurhashImage
                        src={answerImg}
                        alt="answer"
                        className={s.img}
                        blurHeight={44}
                        blurWidth={120}
                      />
                    )}
                  </div>
                )}
                {isFetching ? (
                  <Skeleton width={200} height={24} containerClassName="flex" />
                ) : (
                  <Typography variant={TypographyVariant.Body2} className={s.deckTitle}>
                    {answer}
                  </Typography>
                )}
              </TCell>
              <TCell>
                {isFetching ? (
                  <Skeleton width={75} height={24} containerClassName="flex" />
                ) : (
                  <Typography tag="span" variant={TypographyVariant.Body2}>
                    {new Date(updated).toLocaleDateString('en-GB')}
                  </Typography>
                )}
              </TCell>
              <TCell>
                {isFetching ? (
                  <Skeleton width={120} height={24} containerClassName="flex" />
                ) : (
                  <Grade grade={grade} />
                )}
              </TCell>
              {isMyPack &&
                (isFetching ? (
                  <Skeleton width={75} height={24} containerClassName="flex" />
                ) : (
                  <TCell>
                    <EditIcon
                      onClick={() =>
                        handleClickToUpdateCard(id, answer, question, questionImg, answerImg)
                      }
                    />
                    <TrashIcon onClick={() => handleClickDeleteCard(id, question)} />
                  </TCell>
                ))}
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
})
