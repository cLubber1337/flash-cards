import s from './ProfilePage.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as EditBtnIcon } from '@/assets/svg/EditBtn.svg'
import { ReactComponent as LogOutIcon } from '@/assets/svg/logoutIcon.svg'
import { Avatar, Button, Card, Typography, TypographyVariant } from '@/components/ui'

interface ProfilePageProps {}

export const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <div className={s.profilePage}>
      <Card className={s.info}>
        <Typography tag="h1" variant={TypographyVariant.Large}>
          Personal Information
        </Typography>
        <div className={s.avatar}>
          <Avatar avatarFallback={'JD'} size={96} />
          <EditBtnIcon className={s.editAvatarBtn} />
        </div>
        <div className={s.name}>
          <Typography variant={TypographyVariant.H1}>John Doe</Typography>
          <EditIcon className={s.editIcon} />
        </div>
        <Typography variant={TypographyVariant.Body2} className={s.email}>
          j&johnson@gmail.com
        </Typography>
        <Button variant="secondary">
          <LogOutIcon />
          Logout
        </Button>
      </Card>
    </div>
  )
}
