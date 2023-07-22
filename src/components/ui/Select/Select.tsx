import { useState } from 'react'

import { Menu } from '@headlessui/react'

import s from './Select.module.scss'

import { ReactComponent as ArrowDownIcon } from '@/assets/svg/arrowDown.svg'
import { ReactComponent as ArrowDownDisabledIcon } from '@/assets/svg/arrowDownDisabled.svg'
import { ReactComponent as ArrowUpIcon } from '@/assets/svg/arrowUp.svg'
import { Typography, TypographyVariant } from '@/components/ui/Typography'

interface SelectProps {
  items: { id: number; title: string }[]
  fullWidth?: boolean
  disabled?: boolean
}

export const Select = ({ items, fullWidth, disabled }: SelectProps) => {
  const [title, setTitle] = useState(items[0].title)

  const handlerClickItem = (title: string) => {
    setTitle(title)
  }

  return (
    <div className={fullWidth ? s.fullWidth : s.select}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              disabled={disabled}
              className={disabled ? `${s.button} ${s.disabled}` : s.button}
            >
              <Typography tag="span" variant={TypographyVariant.Body1}>
                {title}
              </Typography>
              {!disabled ? !open ? <ArrowDownIcon /> : <ArrowUpIcon /> : null}
              {disabled && <ArrowDownDisabledIcon />}
            </Menu.Button>
            <Menu.Items className={s.items}>
              {items.map(item => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <span
                      onClick={() => handlerClickItem(item.title)}
                      className={active ? `${s.item} ${s.activeItem}` : s.item}
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
