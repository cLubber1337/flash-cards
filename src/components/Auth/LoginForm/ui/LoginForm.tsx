import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './LoginForm.module.scss'

import { loginFormSchema, LoginFormValues } from '@/components/Auth/LoginForm'
import { Button, Card, TextField, Typography, TypographyVariant } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/Controlled/ControlledCheckbox'

interface LoginFormProps {
  onSubmit?: SubmitHandler<LoginFormValues>
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  return (
    <Card className={s.loginForm}>
      <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <DevTool control={control} />
        <TextField
          {...register('email')}
          label="Email"
          errorMessage={errors.email?.message}
          className={s.email}
          fullWidth
        />
        <TextField
          {...register('password')}
          type="password"
          label="Password"
          errorMessage={errors.password?.message}
          className={s.password}
          fullWidth
        />
        <div className={s.checkbox}>
          <ControlledCheckbox label={'Remember me'} control={control} name={'rememberMe'} />
        </div>
        <Link to="#" className={s.forgotPasswordLink}>
          <Typography variant={TypographyVariant.Body2}>Forgot Password?</Typography>
        </Link>
        <div className={s.submitBtn}>
          <Button type="submit" fullWidth>
            Sign in
          </Button>
        </div>
      </form>
      <div className={s.registerLink}>
        <Typography variant={TypographyVariant.Body2} className={s.subtitle}>
          Don&apos;t have an account?
        </Typography>
        <Link to="/register" className={s.link}>
          Sign Up
        </Link>
      </div>
    </Card>
  )
}
