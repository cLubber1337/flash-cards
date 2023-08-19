import s from './Question.module.scss'

import { Typography, TypographyVariant } from '@/components/ui'

interface QuestionProps {
  question: string
  shots: number
  questionImg?: string
}

export const Question = ({ question, shots, questionImg }: QuestionProps) => {
  return (
    <div className={s.question}>
      <Typography tag="h2" variant={TypographyVariant.Body1}>
        Question:{' '}
        <Typography tag="span" variant={TypographyVariant.Body2}>
          {question}
        </Typography>
      </Typography>
      <div className={s.cover}>
        <img src={questionImg} alt="question" className={s.img} />
      </div>
      <Typography variant={TypographyVariant.Body2} className={s.shots}>
        Количество попыток ответов на вопрос: {shots}
      </Typography>
    </div>
  )
}
