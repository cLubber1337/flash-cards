import { ChangeEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { EditNameFormValues } from '../model/types/EditNameFormValues.ts'

import s from './ProfilePage.module.scss'

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as EditAvatarIcon } from '@/assets/svg/EditBtn.svg'
import { ReactComponent as LogOutIcon } from '@/assets/svg/logoutIcon.svg'
import { ReactComponent as BackIcon } from '@/assets/svg/navigateArrowLeft.svg'
import { Avatar, Button, Card, Typography, TypographyVariant } from '@/components/ui'
import { EditNameForm } from '@/pages/ProfilePage/ui/EditNameForm/EditNameForm.tsx'
import { useLogoutMutation, useMeQuery } from '@/services/auth/authApi.ts'
import { useChangeUserNameMutation, useUpdatePhotoMutation } from '@/services/profile'
import { getInitials } from '@/utils/helpers'

interface ProfilePageProps {}

export const ProfilePage = ({}: ProfilePageProps) => {
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()
  const { data } = useMeQuery()
  const [logout] = useLogoutMutation()
  const [changeName, { isLoading }] = useChangeUserNameMutation()
  const [updatePhoto] = useUpdatePhotoMutation()

  const handleEditName = () => {
    setEditMode(!editMode)
  }

  const handleSaveChanges = ({ name }: EditNameFormValues) => {
    if (data?.name === name) {
      setEditMode(!editMode)

      return
    }
    changeName({ name })
      .unwrap()
      .then(() => setEditMode(!editMode))
  }

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => navigate('/login'))
      .catch(err => console.error(err))
  }
  const handleEditAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const file = e.target.files![0]

    formData.append('avatar', file)
    updatePhoto(formData)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className={s.profilePage}>
      <div className={s.linkBack} onClick={handleGoBack}>
        <BackIcon />
        <Typography variant={TypographyVariant.Body2}>Back</Typography>
      </div>
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
          {!editMode && (
            <label htmlFor="edit-photo">
              <EditAvatarIcon className={s.editAvatarBtn} />
              <input
                id="edit-photo"
                type="file"
                accept="image/*"
                onChange={handleEditAvatar}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        {editMode ? (
          <EditNameForm
            onSubmit={handleSaveChanges}
            value={data?.name}
            disabled={isLoading}
            setEditMode={setEditMode}
          />
        ) : (
          <>
            <div className={s.name}>
              <Typography variant={TypographyVariant.H1}>{data?.name}</Typography>
              <EditIcon className={s.editIcon} onClick={handleEditName} />
            </div>
            <Typography variant={TypographyVariant.Body2} className={s.email}>
              {data?.email}
            </Typography>
            <Button variant="secondary" onClick={handleLogout} fullWidth>
              <LogOutIcon />
              Logout
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
