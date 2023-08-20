import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './ForgotPasswordForm.module.scss'

import {
  forgotPasswordFormSchema,
  ForgotPasswordFormValues,
} from '@/components/Auth/ForgotPasswordForm'
import { Button, Card, ControlledTextField, Typography, TypographyVariant } from '@/components/ui'

interface ForgotPasswordFormProps {
  onSubmit?: SubmitHandler<ForgotPasswordFormValues>
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  return (
    <Card className={s.forgotPasswordForm}>
      <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <DevTool control={control} />
        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          errorMessage={errors.email?.message}
          className={s.textField}
          fullWidth
        />
        <Typography variant={TypographyVariant.Body2} className={s.subtitle}>
          Enter your email address and we will send you further instructions
        </Typography>

        <Button type="submit" fullWidth>
          Send Instructions
        </Button>
      </form>
      <div className={s.signInLink}>
        <Typography variant={TypographyVariant.Body2} className={s.subtitle_2}>
          Did you remember your password?
        </Typography>
        <Link to="/login" className={s.link}>
          Try logging in
        </Link>
      </div>
    </Card>
  )
}
