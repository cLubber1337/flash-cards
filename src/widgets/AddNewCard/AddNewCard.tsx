import { useState } from 'react'

import s from './AddNewCard.module.scss'

import answerImg from '@/assets/img/answerImage.jpg'
import questionImg from '@/assets/img/questionImage.jpg'
import {
  Button,
  Card,
  CardHeader,
  Modal,
  Select,
  TextField,
  Typography,
  TypographyVariant,
} from '@/components/ui'

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
  const chooseQuestionFormat = (title: string) => {
    if (title === 'Text with picture') {
      setTextOnly(false)
    } else {
      setTextOnly(true)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <div className={s.addNewCard}>
        <CardHeader title="Add New Card" onClose={() => onClose(false)} />
        <Card className={s.content}>
          <Select
            className={s.select}
            items={selectOptions}
            fullWidth
            label="Choose a question format"
            onClickItem={chooseQuestionFormat}
          />

          {/*---------------------------------Question-------------------------------------*/}

          <Typography variant={TypographyVariant.H2}>Question:</Typography>
          <div className={s.textWithPicture}>
            <TextField fullWidth label="Write your question" />
            {!textOnly && (
              <div>
                <div className={s.cover}>
                  <img className={s.img} src={questionImg} alt="question" />
                </div>
                <Button variant="secondary" fullWidth>
                  Change Cover
                </Button>
              </div>
            )}
          </div>

          {/*---------------------------------Answer-------------------------------------*/}

          <Typography variant={TypographyVariant.H2}>Answer:</Typography>
          <div className={s.textWithPicture}>
            <TextField fullWidth label="Write your answer" />
            {!textOnly && (
              <div>
                <div className={s.cover}>
                  <img className={s.img} src={answerImg} alt="Answer" />
                </div>
                <Button variant="secondary" fullWidth>
                  Change Cover
                </Button>
              </div>
            )}
          </div>

          {/*---------------------------------Card Footer-------------------------------*/}

          <div className={s.cardFooter}>
            <Button variant="secondary" onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button type="submit">Add New Pack</Button>
          </div>
        </Card>
      </div>
    </Modal>
  )
}
