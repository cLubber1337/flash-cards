import { memo, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AddNewCardValues } from '../model/types/types.ts'
import { addNewCardSchema } from '../model/validation/addNewCardSchema.ts'

import s from './AddNewCard.module.scss'

import answerImg from '@/assets/img/answerImage.jpg'
import questionImg from '@/assets/img/questionImage.jpg'
import {
  Button,
  Card,
  CardHeader,
  ControlledTextField,
  Modal,
  Select,
  Typography,
  TypographyVariant,
} from '@/components/ui'
import { useUpdateCardMutation } from '@/services/cards'
import { useCreateCardMutation } from '@/services/cards/cardsApi.ts'
import { QuestionFormat, questionFormatOptions } from '@/utils/constants'

interface AddNewCardProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
  editMode?: boolean
  cardId?: string
  answer?: string
}

export const AddNewCard = memo(
  ({ isOpen, onClose, cardId, editMode = false, answer }: AddNewCardProps) => {
    const [textOnly, setTextOnly] = useState(false)
    const { deckId } = useParams()

    console.log(answer)
    const [createCard, { isLoading: isLoadingCreateCard }] = useCreateCardMutation()
    const [updateCard, { isLoading: isLoadingUpdateCard }] = useUpdateCardMutation()

    const { handleSubmit, control, reset, watch, register } = useForm<AddNewCardValues>({
      mode: 'onSubmit',
      resolver: zodResolver(addNewCardSchema),
      defaultValues: {
        answer: '',
        answerImg: '',
        question: '',
        questionImg: '',
      },
    })

    const answerImage = watch('answerImg')[0]
      ? URL.createObjectURL(watch('answerImg')[0])
      : answerImg
    const questionImage = watch('questionImg')[0]
      ? URL.createObjectURL(watch('questionImg')[0])
      : questionImg

    const handleClose = () => {
      onClose(false)
      reset()
    }

    const onSubmit = (data: AddNewCardValues) => {
      const formData = new FormData()

      formData.append('answer', data.answer)
      data.answerImg[0] && formData.append('answerImg', data.answerImg[0])
      formData.append('question', data.question)
      data.questionImg[0] && formData.append('questionImg', data.questionImg[0])

      editMode
        ? toast
            .promise(updateCard({ id: cardId!, formData }).unwrap(), {
              pending: 'Updating...',
              success: 'The card was successfully updated',
              error: 'The card was not updated',
            })
            .then(() => {
              handleClose()
            })
            .catch(e => toast.error(e.data.message))
        : createCard({ id: deckId!, formData })
            .unwrap()
            .then(() => {
              handleClose()
            })
            .catch(e => toast.error(e.data.message))
    }

    const chooseQuestionFormat = (questionFormat: string) => {
      if (questionFormat === QuestionFormat.TextWithPicture) {
        setTextOnly(false)
      } else {
        setTextOnly(true)
      }
    }

    return (
      <Modal isOpen={isOpen} onClose={handleClose} lazy>
        <div className={s.addNewCard}>
          <CardHeader title={editMode ? 'Edit Card' : 'Add New Card'} onClose={handleClose} />
          <Card className={s.content}>
            <Select
              className={s.select}
              items={questionFormatOptions}
              fullWidth
              label="Choose a question format"
              onClickItem={chooseQuestionFormat}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <DevTool control={control} />
              <Typography variant={TypographyVariant.H2} className={s.title}>
                Question:
              </Typography>
              <div className={s.textWithPicture}>
                <ControlledTextField
                  className={s.textField}
                  control={control}
                  name="question"
                  fullWidth
                  label="Write your question"
                />
                {!textOnly && (
                  <div>
                    <div className={s.cover}>
                      <img className={s.img} src={questionImage} alt="question" />
                    </div>

                    <label htmlFor="change-cover-question">
                      <Button as={'a'} variant="secondary" fullWidth>
                        Change Cover
                      </Button>
                      <input
                        id="change-cover-question"
                        type="file"
                        accept="image/*"
                        {...register('questionImg')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/*---------------------------------Answer-------------------------------------*/}

              <Typography
                variant={TypographyVariant.H2}
                className={clsx(s.title, !textOnly && s.mt_26)}
              >
                Answer:
              </Typography>
              <div className={s.textWithPicture}>
                <ControlledTextField
                  value={'asdasdasdasdasd'}
                  className={s.textField}
                  control={control}
                  name="answer"
                  fullWidth
                  label="Write your answer"
                />
                {!textOnly && (
                  <div>
                    <div className={s.cover}>
                      <img className={s.img} src={answerImage} alt="answer" />
                    </div>

                    <label htmlFor="change-cover-answer">
                      <Button as={'a'} variant="secondary" fullWidth>
                        Change Cover
                      </Button>
                      <input
                        id="change-cover-answer"
                        type="file"
                        accept="image/*"
                        {...register('answerImg')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/*---------------------------------Card Footer-------------------------------*/}

              <div className={s.cardFooter}>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoadingUpdateCard || isLoadingCreateCard}>
                  {editMode ? 'Save changes' : 'Add New Card'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Modal>
    )
  }
)
