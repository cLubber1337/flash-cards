import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import { Question } from '../ui/Question/Question.tsx'

import s from './LearnPackPage.module.scss'

import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { Answer } from '@/pages/LearnPackPage/ui/Answer/Answer.tsx'
import {
  useGetRandomCardQuery,
  useLazyGetRandomCardQuery,
  useRateCardMutation,
} from '@/services/cards'

interface LearnPackPageProps {}

export const LearnPackPage = ({}: LearnPackPageProps) => {
  const { deckId } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)
  const [grade, setGrade] = useState(0)
  const [getRandomCard, isLoading] = useLazyGetRandomCardQuery()

  const [rateCard] = useRateCardMutation()
  const { data: randomCardData } = useGetRandomCardQuery({
    id: deckId!,
  })

  const rateAnswer = (grade: number) => {
    setGrade(grade)
  }

  const handleShowNextQuestion = () => {
    rateCard({ deckId: deckId!, grade, cardId: randomCardData?.id! })
      .unwrap()
      .then(() => {
        getRandomCard({ id: deckId! })
          .unwrap()
          .then(() => setShowAnswer(false))
          .catch(() => alert("Can't get random card"))
      })
      .catch(() => alert("Can't rate this card"))
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
        <Question
          question={randomCardData?.question}
          shots={randomCardData?.shots}
          questionImg={randomCardData?.questionImg}
        />
        {showAnswer && (
          <Answer
            answer={randomCardData?.answer}
            answerImg={randomCardData?.answerImg}
            onClickItem={rateAnswer}
          />
        )}
        {!showAnswer ? (
          <Button fullWidth onClick={() => setShowAnswer(true)}>
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
