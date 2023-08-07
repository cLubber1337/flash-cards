import * as avatar from '@radix-ui/react-avatar'

import s from './Avatar.module.scss'

interface AvatarProps {
  src?: string
  alt?: string
  avatarFallback?: string
  size?: number
}

export const Avatar = ({ src, alt, avatarFallback, size = 36 }: AvatarProps) => {
  const style = {
    width: size,
    height: size,
  }

  return (
    <avatar.Root style={style} className={s.avatarRoot}>
      <avatar.Image className={s.avatarImage} src={src} alt={alt} />
      <avatar.Fallback className={s.avatarFallback}>{avatarFallback}</avatar.Fallback>
    </avatar.Root>
  )
}
s
