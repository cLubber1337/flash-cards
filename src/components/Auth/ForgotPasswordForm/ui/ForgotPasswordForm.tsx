import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './ForgotPasswordForm.module.scss'

import {
  forgotPasswordFormSchema,
  ForgotPasswordFormValues,
} from '@/components/Auth/ForgotPasswordForm'
import { Button, Card, TextField, Typography, TypographyVariant } from '@/components/ui'

interface ForgotPasswordFormProps {
  onSubmit?: SubmitHandler<ForgotPasswordFormValues>
}

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  return (
    <Card className={s.forgotPasswordForm}>
      <div className={s.title}>
        <Typography tag="h1" variant={TypographyVariant.Large}>
          Forgot your password?
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <DevTool control={control} />
        <TextField
          {...register('email')}
          label="Email"
          errorMessage={errors.email?.message}
          className={s.textField}
          fullWidth
        />
        <Typography variant={TypographyVariant.Body2} className={s.subtitle}>
          Enter your email address and we will send you further instructions
        </Typography>
        <div className={s.submitBtn}>
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </div>
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
