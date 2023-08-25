import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './CreateNewPasswordForm.module.scss'

import {
  createNewPasswordFormSchema,
  CreateNewPasswordFormValues,
} from '@/components/Auth/CreateNewPasswordForm'
import { Button, Card, ControlledTextField, Typography, TypographyVariant } from '@/components/ui'

interface CreateNewPasswordFormProps {
  onSubmit?: SubmitHandler<CreateNewPasswordFormValues>
}

export const CreateNewPasswordForm = ({ onSubmit }: CreateNewPasswordFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordFormSchema),
  })

  return (
    <Card className={s.createNewPasswordForm}>
      <Typography tag="h1" variant={TypographyVariant.Large} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit!)} className={s.form}>
        <DevTool control={control} />
        <ControlledTextField
          control={control}
          name="password"
          type="password"
          label="Password"
          errorMessage={errors.password?.message}
          className={s.textField}
          fullWidth
        />
        <Typography tag="p" variant={TypographyVariant.Body2} className={s.subtitle}>
          Create new password and we will send you further instructions to email
        </Typography>

        <Button type="submit" fullWidth>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
