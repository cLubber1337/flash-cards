import { ButtonHTMLAttributes } from 'react'

import * as checkbox from '@radix-ui/react-checkbox'

import { TypographyVariant, Typography } from '../Typography'

import { ReactComponent as CheckDisabledIcon } from './assets/checkDisabledIcon.svg'
import { ReactComponent as CheckIcon } from './assets/checkIcon.svg'
import s from './Checkbox.module.scss'

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  disabled?: boolean
}
export const Checkbox = ({ text, disabled, ...rest }: CheckboxProps) => {
  return (
    <div className={s.checkbox}>
      <checkbox.Root
        {...rest}
        disabled={disabled}
        className={disabled ? `${s.checkboxRoot} ${s.disabled}` : s.checkboxRoot}
        id={rest.id}
      >
        <checkbox.Indicator className={s.checkboxIndicator}>
          {!disabled ? <CheckIcon /> : <CheckDisabledIcon />}
        </checkbox.Indicator>
      </checkbox.Root>
      <label htmlFor={rest.id} className={s.label}>
        <Typography
          tag="span"
          variant={TypographyVariant.Body2}
          className={disabled ? s.disabled : ''}
        >
          {text}
        </Typography>
      </label>
    </div>
  )
}
