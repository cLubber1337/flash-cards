import s from './Answer.module.scss'

import { RadioGroup, Typography, TypographyVariant } from '@/components/ui'
import { answersGrade } from '@/utils/constants'

interface AnswerProps {
  answer?: string
  answerImg?: string
  onClickItem?: (grade: number) => void
}

export const Answer = ({ answer, answerImg, onClickItem }: AnswerProps) => {
  return (
    <div className={s.answer}>
      <Typography tag="h2" variant={TypographyVariant.Body1} className={s.title}>
        Answer:{' '}
        <Typography tag="span" variant={TypographyVariant.Body2}>
          {answer}
        </Typography>
      </Typography>
      {answerImg && (
        <div className={s.cover}>
          <img src={answerImg} alt="question" className={s.img} />
        </div>
      )}
      <RadioGroup
        items={answersGrade}
        label="Rate yourself:"
        className={s.radioGroup}
        onClickItem={onClickItem}
      />
    </div>
  )
}
