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

interface AddNewPackProps {
  isOpen: boolean
  onClose: (isOpen: boolean) => void
}

export const AddNewPack = ({ isOpen, onClose }: AddNewPackProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.addNewPack}>
        <CardHeader title="Add New Pack" onClose={onClose} />
        <Card className={s.content}>
          <div className={s.img} />
          <Button variant="secondary">
            <ImageIcon />
            <Typography tag="span" variant={TypographyVariant.Subtitle2}>
              Change Cover
            </Typography>
          </Button>
          <TextField title="Name Pack" placeholder="Name..." fullWidth search />
          <Checkbox label="Private pack" id="check_AnP" />
        </Card>
        <CardFooter twoButtons onAction={() => null} onDismiss={onClose} />
      </div>
    </Modal>
  )
}
