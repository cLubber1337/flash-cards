import { ButtonHTMLAttributes, forwardRef } from 'react'

import * as checkbox from '@radix-ui/react-checkbox'

import { TypographyVariant, Typography } from '../Typography'

import { ReactComponent as CheckDisabledIcon } from './assets/checkDisabledIcon.svg'
import { ReactComponent as CheckIcon } from './assets/checkIcon.svg'
import s from './Checkbox.module.scss'

export interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  disabled?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, disabled, checked, onCheckedChange, ...rest }, ref) => {
    return (
      <div className={s.checkbox}>
        <checkbox.Root
          ref={ref} // передача ссылки внутрь компонента
          {...rest}
          disabled={disabled}
          className={disabled ? `${s.checkboxRoot} ${s.disabled}` : s.checkboxRoot}
          id={rest.id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        >
          <checkbox.Indicator className={s.checkboxIndicator}>
            {disabled ? <CheckDisabledIcon /> : <CheckIcon />}
          </checkbox.Indicator>
        </checkbox.Root>
        <label htmlFor={rest.id} className={disabled ? `${s.label} ${s.disabled}` : s.label}>
          <Typography tag="span" variant={TypographyVariant.Body2}>
            {label}
          </Typography>
        </label>
      </div>
    )
  }
)
