import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './RegistrationForm.module.scss'

import { registrationFormSchema, RegistrationFormValues } from '@/components/Auth/RegistrationForm'
import { Button, Card, TextField, Typography, TypographyVariant } from '@/components/ui'

interface SignUpFormProps {}

export const RegistrationForm = ({}: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
  })

  const onSubmit: SubmitHandler<RegistrationFormValues> = data => {
    console.log(data)
  }

  return (
    <Card className={s.registrationForm}>
      <div className={s.title}>
        <Typography tag="h1" variant={TypographyVariant.Large}>
          Sign Up
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <DevTool control={control} />
        <TextField
          {...register('email')}
          label="Email"
          errorMessage={errors.email?.message}
          className={s.textField}
          fullWidth
        />
        <TextField
          {...register('password')}
          type="password"
          label="Password"
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          className={s.textField}
          fullWidth
        />
        <TextField
          {...register('confirmPassword')}
          type="password"
          label="Confirm Password"
          errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          className={s.textField}
          fullWidth
        />
        <div className={s.submitBtn}>
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </div>
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
