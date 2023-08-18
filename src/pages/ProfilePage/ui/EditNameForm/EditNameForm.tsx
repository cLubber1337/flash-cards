import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EditNameFormValues } from '../../model/types/EditNameFormValues.ts'
import { editNameFormSchema } from '../../model/validation/editNameFormSchema.ts'

import s from './EditNameForm.module.scss'

import { Button } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/Controlled/ControlledTextField/ControlledTextField.tsx'

interface EditNameFormProps {
  onSubmit: SubmitHandler<EditNameFormValues>
  value?: string
  disabled?: boolean
  setEditMode: (editMode: boolean) => void
}

export const EditNameForm = ({ onSubmit, value, disabled, setEditMode }: EditNameFormProps) => {
  const { handleSubmit, control } = useForm<EditNameFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(editNameFormSchema),
    defaultValues: {
      name: value,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.editNameForm}>
      <ControlledTextField
        control={control}
        name="name"
        autoFocus
        label="Nickname"
        fullWidth
        className={s.textField}
      />
      <Button type="submit" disabled={disabled} fullWidth>
        Save Changes
      </Button>
      <Button variant="secondary" disabled={disabled} onClick={() => setEditMode(false)} fullWidth>
        Cancel
      </Button>
    </form>
  )
}
