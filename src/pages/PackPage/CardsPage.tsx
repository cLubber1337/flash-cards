import { Link } from 'react-router-dom'

import s from './CardPage.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { TextField, Typography, TypographyVariant } from '@/components/ui'
import { selectSortBy } from '@/services/decks/selectors.ts'
import { useAppSelector } from '@/services/store.ts'
import { MyPackMenu } from '@/widgets/MyPackMenu/MyPackMenu.tsx'
import { TableCards } from '@/widgets/Table/TableCards/TableCards.tsx'

interface PackPageProps {}

export const CardsPage = ({}: PackPageProps) => {
  const sortBy = useAppSelector(selectSortBy)

  return (
    <div className={s.packPage}>
      <Link to={'/'} className={s.linkBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back to Packs List</Typography>
      </Link>
      <div className={s.title}>
        <Typography variant={TypographyVariant.Large}>My Pack</Typography>
        <MyPackMenu />
      </div>
      <div className={s.deckImg}>
        <img src={deckImg} alt="deck" className={s.img} />
      </div>
      <div className={s.search}>
        <TextField search fullWidth />
      </div>
      <TableCards sortBy={sortBy} data={[]} />
    </div>
  )
}
