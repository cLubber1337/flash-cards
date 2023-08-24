import { Link } from 'react-router-dom'

import s from './CheckEmail.module.scss'

import { ReactComponent as MailIcon } from '@/assets/svg/checkEmail.svg'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'

interface CheckEmailProps {}

export const CheckEmail = ({}: CheckEmailProps) => {
  return (
    <Card className={s.checkEmail}>
      <Typography variant={TypographyVariant.Large} className={s.title}>
        Check Email
      </Typography>
      <MailIcon className={s.icon} />
      <Typography variant={TypographyVariant.Body2} className={s.text}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button as={Link} to="/login" fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}
