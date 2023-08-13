import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EditNameFormValues } from '../../model/types/EditNameFormValues.ts'
import { editNameFormSchema } from '../../model/validation/editNameFormSchema.ts'

import s from './EditNameForm.module.scss'

import { Button, TextField } from '@/components/ui'

interface EditNameFormProps {
  onSubmit: SubmitHandler<EditNameFormValues>
  value?: string
}

export const EditNameForm = ({ onSubmit, value }: EditNameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNameFormValues>({
    resolver: zodResolver(editNameFormSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.editNameForm}>
      <TextField
        customValue={value}
        className={s.textField}
        label="Nickname"
        fullWidth
        {...register('name')}
        errorMessage={errors.name?.message}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  )
}
