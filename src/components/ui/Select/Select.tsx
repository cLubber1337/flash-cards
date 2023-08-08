import { useState } from 'react'

import { Menu } from '@headlessui/react'

import s from './Select.module.scss'

import { ReactComponent as ArrowDownIcon } from '@/assets/svg/arrowDown.svg'
import { ReactComponent as ArrowDownDisabledIcon } from '@/assets/svg/arrowDownDisabled.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/svg/arrowUp.svg'

interface SelectProps {
  items: { id: number; title: string }[]
  currentItem?: number
  fullWidth?: boolean
  disabled?: boolean
  pagination?: boolean
  onClickItem?: (title: any) => void
}

export const Select = ({
  items,
  fullWidth,
  disabled,
  pagination,
  onClickItem,
  currentItem,
}: SelectProps) => {
  const [title, setTitle] = useState(currentItem ? currentItem : items[0].title)

  const handlerClickItem = (title: string) => {
    setTitle(title)
    onClickItem?.(Number(title))
  }

  const ClassesForDefault = disabled ? `${s.button} ${s.disabled}` : s.button
  const ClassesForPagination = disabled
    ? `${s.button} ${s.pagination} ${s.disabled}`
    : `${s.button} ${s.pagination}`
  const ClassesForItems = pagination ? `${s.items} ${s.paginationItems}` : s.items
  const ClassesForItem = pagination ? `${s.item} ${s.paginationItem}` : s.item

  return (
    <div className={fullWidth ? s.fullWidth : s.select}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              disabled={disabled}
              className={pagination ? ClassesForPagination : ClassesForDefault}
            >
              <span>{title}</span>
              {!disabled ? !open ? <ArrowDownIcon /> : <ArrowUpIcon /> : null}
              {disabled && <ArrowDownDisabledIcon />}
            </Menu.Button>
            <Menu.Items className={ClassesForItems}>
              {items.map(item => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <span
                      onClick={() => handlerClickItem(item.title)}
                      className={active ? `${ClassesForItem} ${s.activeItem}` : ClassesForItem}
                    >
                      {item.title}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  )
}
