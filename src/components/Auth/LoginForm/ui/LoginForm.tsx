import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './LoginForm.module.scss'

import { loginFormSchema, LoginFormValues } from '@/components/Auth/LoginForm'
import { Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/Controlled/ControlledCheckbox'
import { ControlledTextField } from '@/components/ui/Controlled/ControlledTextField/ControlledTextField.tsx'

interface LoginFormProps {
  onSubmit?: SubmitHandler<LoginFormValues>
  disabled?: boolean
  loginError?: string | null
}

export const LoginForm = ({ onSubmit, disabled, loginError }: LoginFormProps) => {
  const { handleSubmit, control, setError } = useForm<LoginFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  if (loginError) {
    setError('email', { message: loginError })
    setError('password', { message: loginError })
  }

  return (
    <Card className={s.loginForm}>
      <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <ControlledTextField
          control={control}
          name="email"
          label="Email"
          className={s.email}
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="password"
          type="password"
          label="Password"
          className={s.password}
          fullWidth
        />
        <div className={s.checkbox}>
          <ControlledCheckbox label={'Remember me'} control={control} name={'rememberMe'} />
        </div>
        <Link to="/recover-password" className={s.forgotPasswordLink}>
          <Typography variant={TypographyVariant.Body2}>Forgot Password?</Typography>
        </Link>
        <Button type="submit" fullWidth className={s.submitBtn} disabled={disabled}>
          Sign in
        </Button>
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
