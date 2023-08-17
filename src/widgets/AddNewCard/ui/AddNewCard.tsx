import { useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

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
import { useCreateCardMutation } from '@/services/cards/cardsApi.ts'
import { QuestionFormat, questionFormatOptions } from '@/utils/constants'

interface AddNewCardProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}

export const AddNewCard = ({ isOpen, onClose }: AddNewCardProps) => {
  const [textOnly, setTextOnly] = useState(false)
  const { deckId } = useParams()
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
  const [createCard] = useCreateCardMutation()

  const answerImage = watch('answerImg')[0] ? URL.createObjectURL(watch('answerImg')[0]) : answerImg
  const questionImage = watch('questionImg')[0]
    ? URL.createObjectURL(watch('questionImg')[0])
    : questionImg

  const handleClose = () => {
    onClose(false)
    reset()
  }

  const onSubmitCreateCard = (data: AddNewCardValues) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    data.answerImg[0] && formData.append('answerImg', data.answerImg[0])
    formData.append('question', data.question)
    data.questionImg[0] && formData.append('questionImg', data.questionImg[0])

    createCard({ id: deckId!, formData })
      .unwrap()
      .then(() => {
        handleClose()
      })
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
        <CardHeader title="Add New Card" onClose={handleClose} />
        <Card className={s.content}>
          <Select
            className={s.select}
            items={questionFormatOptions}
            fullWidth
            label="Choose a question format"
            onClickItem={chooseQuestionFormat}
          />
          <form onSubmit={handleSubmit(onSubmitCreateCard)}>
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
              <Button type="submit">Add New Pack</Button>
            </div>
          </form>
        </Card>
      </div>
    </Modal>
  )
}
