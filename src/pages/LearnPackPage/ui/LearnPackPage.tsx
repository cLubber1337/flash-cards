import { useState } from 'react'

import { Link } from 'react-router-dom'

import { Question } from '../ui/Question/Question.tsx'

import s from './LearnPackPage.module.scss'

import imgAnswer from '@/assets/img/answerImage.jpg'
import img from '@/assets/img/questionImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { Answer } from '@/pages/LearnPackPage/ui/Answer/Answer.tsx'

interface LearnPackPageProps {}

export const LearnPackPage = ({}: LearnPackPageProps) => {
  const [answer, setAnswer] = useState(false)
  const handleShowAnswer = () => {
    setAnswer(true)
  }
  const handleShowNextQuestion = () => {
    setAnswer(false)
  }

  return (
    <div className={s.learnPackPage}>
      <Link to={'/'} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>
      <Card className={s.content}>
        <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
          Learn &rdquo;--DECK NAME--&ldquo;
        </Typography>
        <Question question={'What is React?'} shots={9} questionImg={img} />
        {answer && (
          <Answer
            answer={'React is a JavaScript library for building user interfaces.'}
            answerImg={imgAnswer}
          />
        )}
        {!answer ? (
          <Button fullWidth onClick={() => handleShowAnswer()}>
            Show Answer
          </Button>
        ) : (
          <Button fullWidth onClick={() => handleShowNextQuestion()}>
            Next Question
          </Button>
        )}
      </Card>
    </div>
  )
}
