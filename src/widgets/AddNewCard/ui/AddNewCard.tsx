import { ChangeEvent, useState } from 'react'

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

interface AddNewCardProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}
const selectOptions = [
  { id: 1, title: 'Text with picture' },
  { id: 2, title: 'Text only' },
]

export const AddNewCard = ({ isOpen, onClose }: AddNewCardProps) => {
  const [textOnly, setTextOnly] = useState(false)
  const [loadedAnswerImg, setLoadedAnswerImg] = useState<File | null>(null)
  const [loadedQuestionImg, setLoadedQuestionImg] = useState<File | null>(null)
  const { deckId } = useParams()
  const { handleSubmit, control, reset, watch } = useForm<AddNewCardValues>({
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
  const handleChangeAnswerCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setLoadedAnswerImg(file)
  }

  const handleClose = () => {
    setLoadedQuestionImg(null)
    setLoadedAnswerImg(null)
    onClose(false)
    reset()
  }

  const onSubmitCreateCard = (data: AddNewCardValues) => {
    const formData = new FormData()

    formData.append('answer', data.answer)
    loadedAnswerImg && formData.append('answerImg', loadedAnswerImg!)
    formData.append('question', data.question)
    loadedQuestionImg && formData.append('questionImg', loadedQuestionImg!)

    createCard({ id: deckId!, formData })
      .unwrap()
      .then(() => {
        handleClose()
      })
  }

  const handleChangeQuestionCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setLoadedQuestionImg(file)
  }

  const chooseQuestionFormat = (title: string) => {
    if (title === 'Text with picture') {
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
            items={selectOptions}
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
                    <img
                      className={s.img}
                      src={loadedQuestionImg ? URL.createObjectURL(loadedQuestionImg) : questionImg}
                      alt="question"
                    />
                  </div>

                  <label htmlFor="change-cover-question">
                    <Button as={'a'} variant="secondary" fullWidth>
                      Change Cover
                    </Button>
                    <input
                      id="change-cover-question"
                      type="file"
                      accept="image/*"
                      onChange={handleChangeQuestionCover}
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
                    <img
                      className={s.img}
                      src={loadedAnswerImg ? URL.createObjectURL(loadedAnswerImg) : answerImg}
                      alt="answer"
                    />
                  </div>

                  <label htmlFor="change-cover-answer">
                    <Button as={'a'} variant="secondary" fullWidth>
                      Change Cover
                    </Button>
                    <input
                      id="change-cover-answer"
                      type="file"
                      accept="image/*"
                      onChange={handleChangeAnswerCover}
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
