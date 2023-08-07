import { ReactNode } from 'react'

import s from './Layout.module.scss'

import { Header } from '@/widgets/Header'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header isAuth />
      <div className={s.content}>{children}</div>
    </div>
  )
}
