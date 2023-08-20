import s from './Loader.module.scss'

interface LoaderProps {}

export const Loader = ({}: LoaderProps) => {
  return (
    <div className={s.loader_1}>
      <div className={s.loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
