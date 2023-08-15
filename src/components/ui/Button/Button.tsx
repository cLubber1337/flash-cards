import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className = '',
    as: Component = 'button',
    ...otherProps
  } = props

  return (
    <div className={s.button}>
      <Component
        className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
        {...otherProps}
      />
    </div>
  )
}
