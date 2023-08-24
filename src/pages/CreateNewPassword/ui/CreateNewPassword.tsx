import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CreateNewPasswordSchema } from '../model/validation/CreateNewPasswordSchema.ts'

import s from './CreateNewPassword.module.scss'

import { Button, Card, ControlledTextField, Typography, TypographyVariant } from '@/components/ui'
import { CreateNewPasswordForm } from '@/pages/CreateNewPassword/model/types/CreateNewPasswordForm.ts'

interface CreateNewPasswordProps {}

export const CreateNewPassword = ({}: CreateNewPasswordProps) => {
  const { control, handleSubmit } = useForm<CreateNewPasswordForm>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateNewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: CreateNewPasswordForm) => {
    console.log(data)
  }

  return (
    <div className={s.createNewPassword}>
      <Card className={s.content}>
        <Typography className={s.title} variant={TypographyVariant.Large}>
          Create new password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            className={s.passwordField}
            name="password"
            control={control}
            label="Password"
            type="password"
            fullWidth
          />
          <Typography className={s.text} variant={TypographyVariant.Body2}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button type="submit" fullWidth>
            Create New Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
