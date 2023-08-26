import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './RegistrationForm.module.scss'

import { registrationFormSchema, RegistrationFormValues } from '@/components/Auth/RegistrationForm'
import { Button, Card, ControlledTextField, Typography, TypographyVariant } from '@/components/ui'

interface SignUpFormProps {
  onSubmit?: SubmitHandler<RegistrationFormValues>
}

export const RegistrationForm = ({ onSubmit }: SignUpFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Card className={s.registrationForm}>
      <div className={s.title}>
        <Typography tag="h1" variant={TypographyVariant.Large}>
          Sign Up
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          errorMessage={errors.email?.message}
          className={s.textField}
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="password"
          type="password"
          label="Password"
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          className={s.textField}
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          className={s.textField}
          fullWidth
        />
        <Button type="submit" fullWidth className={s.submitBtn}>
          Sign Up
        </Button>
      </form>
      <div className={s.signInLink}>
        <Typography variant={TypographyVariant.Body2} className={s.subtitle}>
          Already have an account?
        </Typography>
        <Link to="/login" className={s.link}>
          Sign In
        </Link>
      </div>
    </Card>
  )
}
