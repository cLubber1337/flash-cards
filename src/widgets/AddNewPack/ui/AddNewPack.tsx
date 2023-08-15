import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AddNewPackValues } from '../model/types/types.ts'
import { addNewPackSchema } from '../model/validation/addNewPackSchema.ts'

import s from './AddNewPack.module.scss'

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
import { useCreateDeckMutation } from '@/services/decks'
import { CreateDeckArgs } from '@/services/decks/types.ts'

interface AddNewPackProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}

export const AddNewPack = ({ isOpen, onClose }: AddNewPackProps) => {
  const [cover, setCover] = useState<File | null>(null)
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const { handleSubmit, control, reset } = useForm<AddNewPackValues>({
    mode: 'onSubmit',
    resolver: zodResolver(addNewPackSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })
  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setCover(file)
  }

  const handleClose = () => {
    onClose(false)
    setCover(null)
    reset()
  }
  const onSubmitCreateDeck = (data: AddNewPackValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate))

    cover && formData.append('cover', cover)

    createDeck(formData as unknown as CreateDeckArgs)
      .unwrap()
      .then(() => {
        handleClose()
      })
      .then(() => {
        console.log('Не удаётся создать новую колоду')
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} lazy>
      <div className={s.addNewPack}>
        <CardHeader title="Add New Pack" onClose={handleClose} />
        <Card className={s.content}>
          <div className={s.cover}>
            <img className={s.img} src={cover ? URL.createObjectURL(cover) : deckImg} alt="cover" />
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
              onChange={handleChangeCover}
              style={{ display: 'none' }}
            />
          </label>
          <form onSubmit={handleSubmit(onSubmitCreateDeck)}>
            <ControlledTextField
              disabled={isLoading}
              className={s.textField}
              control={control}
              name="name"
              label="Name Pack"
              placeholder="Name..."
              fullWidth
            />
            <ControlledCheckbox
              control={control}
              name="isPrivate"
              label="Private pack"
              disabled={isLoading}
            />
            <div className={s.cardFooter}>
              <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit">Add New Pack</Button>
            </div>
          </form>
        </Card>
      </div>
    </Modal>
  )
}
