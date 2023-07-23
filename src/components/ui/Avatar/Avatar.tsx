import * as avatar from '@radix-ui/react-avatar'

import s from './Avatar.module.scss'

interface AvatarProps {
  src?: string
  alt?: string
  avatarFallback?: string
}

export const Avatar = ({ src, alt, avatarFallback }: AvatarProps) => {
  return (
    <avatar.Root className={s.avatarRoot}>
      <avatar.Image className={s.avatarImage} src={src} alt={alt} />
      <avatar.Fallback className={s.avatarFallback}>{avatarFallback}</avatar.Fallback>
    </avatar.Root>
  )
}
s
