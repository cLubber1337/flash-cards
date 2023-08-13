import s from './Grade.module.scss'

import { ReactComponent as EmptyStarIcon } from '@/assets/svg/EmptyStar.svg'
import { ReactComponent as StarIcon } from '@/assets/svg/star.svg'

interface GradeProps {
  grade: number
}

export const Grade = ({ grade }: GradeProps) => {
  const countStars = (grade: number) => {
    const MAX_RATING = 5
    const stars = []

    for (let i = 0; i < MAX_RATING; i++) {
      if (i < grade) {
        stars.push(<StarIcon />)
      } else {
        stars.push(<EmptyStarIcon />)
      }
    }

    return stars
  }

  const stars = countStars(grade)

  return (
    <div className={s.grade}>
      <div className={s.stars}>
        {stars.map((star, index) => (
          <span className={s.star} key={index}>
            {star}
          </span>
        ))}
      </div>
    </div>
  )
}
