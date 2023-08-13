import { useState } from 'react'

import { EditNameFormValues } from '../model/types/EditNameFormValues.ts'

import s from './ProfilePage.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as EditBtnIcon } from '@/assets/svg/EditBtn.svg'
import { ReactComponent as LogOutIcon } from '@/assets/svg/logoutIcon.svg'
import { Avatar, Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { EditNameForm } from '@/pages/ProfilePage/ui/EditNameForm/EditNameForm.tsx'
import { useMeQuery } from '@/services/auth/authApi.ts'
import { useChangeUserNameMutation } from '@/services/profile'
import { getInitials } from '@/utils/helpers'

interface ProfilePageProps {}

export const ProfilePage = ({}: ProfilePageProps) => {
  const [editMode, setEditMode] = useState(false)
  const { data } = useMeQuery()
  const [changeName] = useChangeUserNameMutation()

  const handleEditName = () => {
    setEditMode(!editMode)
  }

  const handleSaveChanges = (data: EditNameFormValues) => {
    changeName(data)
    setEditMode(false)
  }

  return (
    <div className={s.profilePage}>
      <Card className={s.info}>
        <Typography tag="h1" variant={TypographyVariant.Large}>
          Personal Information
        </Typography>
        <div className={s.avatar}>
          {data?.avatar ? (
            <Avatar src={data.avatar} size={96} />
          ) : (
            <Avatar avatarFallback={getInitials(data?.name)} size={96} />
          )}
          {!editMode && <EditBtnIcon className={s.editAvatarBtn} />}
        </div>

        {editMode ? (
          <EditNameForm onSubmit={handleSaveChanges} value={data?.name} />
        ) : (
          <>
            <div className={s.name}>
              <Typography variant={TypographyVariant.H1}>{data?.name}</Typography>
              <EditIcon className={s.editIcon} onClick={handleEditName} />
            </div>
            <Typography variant={TypographyVariant.Body2} className={s.email}>
              {data?.email}
            </Typography>
            <Button variant="secondary">
              <LogOutIcon />
              Logout
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
