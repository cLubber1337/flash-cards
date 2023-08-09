import { Link } from 'react-router-dom'

import s from './CheckEmail.module.scss'

import { ReactComponent as CheckEmailIcon } from '@/assets/svg/checkEmail.svg'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'

interface CheckEmailProps {
  email?: string
}

export const CheckEmail = ({ email = 'example@mail.com' }: CheckEmailProps) => {
  return (
    <Card className={s.checkEmail}>
      <div className={s.content}>
        <Typography variant={TypographyVariant.Large}>Check Email</Typography>
        <CheckEmailIcon className={s.icon} />
        <Typography variant={TypographyVariant.Body2} className={s.text}>
          We’ve sent an Email with instructions to {email}
        </Typography>
      </div>
      <Button as={Link} to="/login">
        Back to Sign In
      </Button>
    </Card>
  )
}
