import { useState } from 'react'

import { Menu } from '@headlessui/react'
import clsx from 'clsx'

import s from './Select.module.scss'

import { ReactComponent as ArrowDownIcon } from '@/assets/svg/arrowDown.svg'
import { ReactComponent as ArrowDownDisabledIcon } from '@/assets/svg/arrowDownDisabled.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/svg/arrowUp.svg'
import { Typography, TypographyVariant } from '@/components/ui'

interface SelectProps {
  items: { id: number; title: string }[]
  currentItem?: number
  fullWidth?: boolean
  disabled?: boolean
  pagination?: boolean
  onClickItem?: (title: any) => void
  label?: string
  className?: string
}

export const Select = ({
  items,
  fullWidth,
  disabled,
  pagination,
  onClickItem,
  currentItem,
  className,
  label,
}: SelectProps) => {
  const [title, setTitle] = useState(currentItem ? currentItem : items[0].title)

  const handlerClickItem = (title: string) => {
    setTitle(title)
    onClickItem?.(title)
  }

  const classes = {
    button: clsx(s.button, disabled && s.disabled),
    pagination: clsx(s.button, s.pagination, disabled && s.disabled),
    items: clsx(s.items, pagination && s.paginationItems, label && s.itemsWithLabel),
    item: clsx(s.item, pagination && s.paginationItem),
    select: clsx(s.select, className, fullWidth && s.fullWidth),
  }

  return (
    <div className={classes.select}>
      {label && (
        <Typography variant={TypographyVariant.Body2} className={s.label}>
          {label}
        </Typography>
      )}
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              disabled={disabled}
              className={pagination ? classes.pagination : classes.button}
            >
              <span>{title}</span>
              {!disabled ? !open ? <ArrowDownIcon /> : <ArrowUpIcon /> : null}
              {disabled && <ArrowDownDisabledIcon />}
            </Menu.Button>
            <Menu.Items className={classes.items}>
              {items.map(item => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <span
                      onClick={() => handlerClickItem(item.title)}
                      className={clsx(classes.item, active && s.activeItem)}
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
