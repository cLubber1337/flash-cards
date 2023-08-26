import { memo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'

import { AddNewCardValues } from '../model/types/types.ts'
import { addNewCardSchema } from '../model/validation/addNewCardSchema.ts'

import s from './AddNewCard.module.scss'

import ansImage from '@/assets/img/answerImage.jpg'
import queImage from '@/assets/img/questionImage.jpg'
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
import { BlurhashImage } from '@/components/ui/Image/BlurhashImage.tsx'
import { QuestionFormat, questionFormatOptions } from '@/utils/constants'

interface AddNewCardProps {
  onSubmit: (values: AddNewCardValues) => void
  isOpen: boolean
  onClose: (isOpen: boolean) => void
  editMode?: boolean

  answer?: string
  question?: string
  answerImg?: string
  questionImg?: string
}

export const AddNewCard = memo(
  ({
    onSubmit,
    isOpen,
    onClose,
    editMode = false,
    answer = '',
    question = '',
    answerImg,
    questionImg,
  }: AddNewCardProps) => {
    const [textOnly, setTextOnly] = useState(false)

    const { handleSubmit, control, watch, register, reset } = useForm<AddNewCardValues>({
      mode: 'onSubmit',
      resolver: zodResolver(addNewCardSchema),
      defaultValues: {
        answer: answer,
        answerImg: '',
        question: question,
        questionImg: '',
      },
    })

    const answerImage = watch('answerImg')[0]
      ? URL.createObjectURL(watch('answerImg')[0])
      : answerImg
      ? answerImg
      : ansImage
    const questionImage = watch('questionImg')[0]
      ? URL.createObjectURL(watch('questionImg')[0])
      : questionImg
      ? questionImg
      : queImage

    const chooseQuestionFormat = (questionFormat: string) => {
      if (questionFormat === QuestionFormat.TextWithPicture) {
        setTextOnly(false)
      } else {
        setTextOnly(true)
      }
    }

    const handleClose = () => {
      onClose(false)
      reset()
    }

    return (
      <Modal isOpen={isOpen} onClose={handleClose} lazy>
        <div className={s.addNewCard}>
          <CardHeader title={editMode ? 'Edit Card' : 'Add New Card'} onClose={handleClose} />
          <Card className={s.content}>
            <Select
              className={s.select}
              options={questionFormatOptions}
              fullWidth
              label="Choose a question format"
              onClickItem={chooseQuestionFormat}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      <BlurhashImage
                        className={s.img}
                        blurWidth={492}
                        blurHeight={119}
                        src={questionImage}
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
                      <BlurhashImage
                        className={s.img}
                        blurWidth={492}
                        blurHeight={119}
                        src={answerImage}
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
                <Button type="submit">{editMode ? 'Save changes' : 'Add New Card'}</Button>
              </div>
            </form>
          </Card>
        </div>
      </Modal>
    )
  }
)
