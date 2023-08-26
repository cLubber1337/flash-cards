import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Answer } from '../ui/Answer/Answer.tsx'
import { Question } from '../ui/Question/Question.tsx'

import s from './LearnPackPage.module.scss'

import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { useGetRandomCardQuery, useRateCardMutation } from '@/services/cards'
import { selectDeckName } from '@/services/decks/selectors.ts'
import { useAppSelector } from '@/services/store.ts'

interface LearnPackPageProps {}

export const LearnPackPage = ({}: LearnPackPageProps) => {
  const { deckId } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)
  const [grade, setGrade] = useState(0)
  const deckName = useAppSelector(selectDeckName)
  const navigate = useNavigate()
  const [previousCardId, setPreviousCardId] = useState('')

  const [rateCard, { isLoading: isLoadingRateCard }] = useRateCardMutation()
  const { data: randomCardData, isFetching: isFetchingRandomCard } = useGetRandomCardQuery({
    id: deckId!,
    previousCardId: previousCardId,
  })

  const rateAnswer = (grade: number) => {
    setGrade(grade)
  }

  const handleShowNextQuestion = () => {
    if (grade === 0) {
      toast.warning('Please rate the current answer to proceed to the next card.')

      return
    }
    rateCard({ deckId: deckId!, grade, cardId: randomCardData?.id! })
      .unwrap()
      .then(() => {
        setPreviousCardId(randomCardData?.id!)
        setShowAnswer(false)
      })
      .catch(() => toast.warning('An error occurred on the server.'))
      .finally(() => {
        setGrade(0)
      })
  }

  if (isFetchingRandomCard) return <Loader />

  return (
    <div className={s.learnPackPage}>
      {isLoadingRateCard && <Loader overlay />}
      <div onClick={() => navigate(-1)} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back</Typography>
      </div>
      <Card className={s.content}>
        <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
          Learn &rdquo;{deckName}&ldquo;
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
          <Button fullWidth onClick={() => handleShowNextQuestion()} disabled={isLoadingRateCard}>
            Next Question
          </Button>
        )}
      </Card>
    </div>
  )
}
