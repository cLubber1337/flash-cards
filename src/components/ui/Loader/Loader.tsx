import clsx from 'clsx'

import s from './Loader.module.scss'

interface LoaderProps {
  overlay?: boolean
}

export const Loader = ({ overlay }: LoaderProps) => {
  return (
    <div className={s.loader_wrapper}>
      <div className={clsx(overlay && s.overlay)}>
        <div className={`${s.loader}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
