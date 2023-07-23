import { useState } from 'react'

import s from './AddNewPack.module.scss'

import { ReactComponent as ImageIcon } from '@/assets/svg/image.svg'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Checkbox,
  Modal,
  TextField,
  Typography,
  TypographyVariant,
} from '@/components/ui'

interface AddNewPackProps {}

export const AddNewPack = ({}: AddNewPackProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handlerClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={handlerClose}>
      <div className={s.addNewPack}>
        <CardHeader title="Add New Pack" onClick={handlerClose} />
        <Card className={s.content}>
          <div className={s.img} />
          <Button variant="secondary">
            <ImageIcon />
            <Typography tag="span" variant={TypographyVariant.Subtitle2}>
              Change Cover
            </Typography>
          </Button>
          <TextField title="Name Pack" placeholder="Name..." fullWidth />
          <Checkbox text="Private pack" />
        </Card>
        <CardFooter twoButtons onAction={() => null} onDismiss={handlerClose} />
      </div>
    </Modal>
  )
}
