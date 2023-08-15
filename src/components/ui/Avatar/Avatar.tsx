import * as avatar from '@radix-ui/react-avatar'

import s from './Avatar.module.scss'

interface AvatarProps {
  src?: string
  alt?: string
  avatarFallback?: string
  size?: number
  cursor?: 'pointer' | 'auto'
}

export const Avatar = ({ src, alt, avatarFallback, size = 36, cursor = 'auto' }: AvatarProps) => {
  const style = {
    width: size,
    height: size,
    cursor: cursor,
  }

  return (
    <avatar.Root style={style} className={s.avatarRoot}>
      <avatar.Image className={s.avatarImage} src={src} alt={alt} />
      <avatar.Fallback className={s.avatarFallback} style={{ fontSize: size / 2 }}>
        {avatarFallback}
      </avatar.Fallback>
    </avatar.Root>
  )
}
s
