import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { LoginFormValues, loginFormSchema } from '@/components/Auth/LoginForm'
import { Button, TextField } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/Controlled/ControlledCheckbox'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <TextField {...register('email')} label="Email" errorMessage={errors.email?.message} />
      <TextField
        {...register('password')}
        type="password"
        label="Password"
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox label={'remember me'} control={control} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
