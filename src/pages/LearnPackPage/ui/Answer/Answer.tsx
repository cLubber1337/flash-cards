import s from './Answer.module.scss'

import { RadioGroup, Typography, TypographyVariant } from '@/components/ui'
import { answersGrade } from '@/utils/constants'

interface AnswerProps {
  answer: string
  answerImg?: string
}

export const Answer = ({ answer, answerImg }: AnswerProps) => {
  return (
    <div className={s.answer}>
      <Typography tag="h2" variant={TypographyVariant.Body1}>
        Answer:{' '}
        <Typography tag="span" variant={TypographyVariant.Body2}>
          {answer}{' '}
        </Typography>
      </Typography>
      <div className={s.cover}>
        <img src={answerImg} alt="question" className={s.img} />
      </div>
      <RadioGroup items={answersGrade} label="Rate yourself:" className={s.radioGroup} />
    </div>
  )
}
