import { ReactNode } from 'react'

import { Popover } from '@headlessui/react'

import s from './Dropdown.module.scss'
interface DropdownProps {
  children?: ReactNode
  action?: ReactNode
}

export const Dropdown = ({ children, action }: DropdownProps) => {
  return (
    <Popover className={s.popover}>
      <Popover.Button className={s.action}>{action}</Popover.Button>

      <Popover.Panel className={s.content}>{children}</Popover.Panel>
    </Popover>
  )
}
