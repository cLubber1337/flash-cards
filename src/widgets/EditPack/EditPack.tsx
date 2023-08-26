import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './EditPack.module.scss'

import deckImg from '@/assets/img/deckImage.jpg'
import { ReactComponent as ImageIcon } from '@/assets/svg/image.svg'
import {
  Button,
  Card,
  CardHeader,
  ControlledCheckbox,
  ControlledTextField,
  Modal,
  Typography,
  TypographyVariant,
} from '@/components/ui'
import { AddNewPackValues } from '@/widgets/AddNewPack/model/types/types.ts'
import { addNewPackSchema } from '@/widgets/AddNewPack/model/validation/addNewPackSchema.ts'

interface EditPackProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
  onSubmit: SubmitHandler<AddNewPackValues>
  deckName?: string
  isPrivate: boolean
  deckCoverImg?: string | null
}

export const EditPack = ({
  isOpen,
  onClose,
  onSubmit,
  deckName,
  isPrivate,
  deckCoverImg,
}: EditPackProps) => {
  const { handleSubmit, control, reset, watch, register, setValue } = useForm<AddNewPackValues>({
    mode: 'onSubmit',
    resolver: zodResolver(addNewPackSchema),
    defaultValues: {
      name: deckName,
      isPrivate: isPrivate,
      cover: '',
    },
  })

  const deckCover = watch('cover')[0]
    ? URL.createObjectURL(watch('cover')[0])
    : deckCoverImg
    ? deckCoverImg
    : deckImg

  const handleClose = () => {
    setValue('cover', '')
    reset()
    onClose(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} lazy>
      <div className={s.editPack}>
        <CardHeader title={'Edit Pack'} onClose={handleClose} />
        <Card className={s.content}>
          <div className={s.cover}>
            <img className={s.img} src={deckCover} alt="cover" />
          </div>
          <label htmlFor="change-cover">
            <Button as={'a'} variant="secondary" fullWidth>
              <ImageIcon />
              <Typography tag="span" variant={TypographyVariant.Subtitle2}>
                Change Cover
              </Typography>
            </Button>
            <input
              id="change-cover"
              type="file"
              accept="image/*"
              {...register('cover')}
              style={{ display: 'none' }}
            />
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ControlledTextField
              className={s.textField}
              control={control}
              name={'name'}
              label="Name Pack"
              placeholder="Name..."
              fullWidth
            />
            <ControlledCheckbox control={control} name="isPrivate" label="Private pack" />
            <div className={s.cardFooter}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </Modal>
  )
}
