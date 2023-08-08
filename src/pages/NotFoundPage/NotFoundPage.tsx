import { Link } from 'react-router-dom'

import s from './NotFoundPage.module.scss'

import { ReactComponent as NotFoundPageIcon } from '@/assets/svg/404.svg'
import { Button, Typography, TypographyVariant } from '@/components/ui'

interface NotFoundPageProps {}

export const NotFoundPage = ({}: NotFoundPageProps) => {
  return (
    <div className={s.notFoundPage}>
      <div className={s.content}>
        <NotFoundPageIcon />
        <Typography variant={TypographyVariant.Body1} className={s.title}>
          Sorry! Page not found!
        </Typography>
        <Button as={Link} to="/">
          Back to home page
        </Button>
      </div>
    </div>
  )
}
