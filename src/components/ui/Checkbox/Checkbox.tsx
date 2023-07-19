import { ButtonHTMLAttributes } from 'react'

import * as checkbox from '@radix-ui/react-checkbox'

import { FontStyle, Typography } from '../Typography'

import CheckDisabledIcon from './assets/checkDisabledIcon.svg'
import CheckIcon from './assets/checkIcon.svg'
import s from './Checkbox.module.scss'

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  disabled?: boolean
}

export const Checkbox = ({ text, disabled, ...rest }: CheckboxProps) => {
  return (
    <form>
      <div className={s.checkbox}>
        <checkbox.Root
          {...rest}
          disabled={disabled}
          className={disabled ? `${s.checkboxRoot} ${s.disabled}` : s.checkboxRoot}
          id="c1"
        >
          <checkbox.Indicator className={s.checkboxIndicator}>
            {!disabled ? (
              <img src={CheckIcon} alt={'checkIcon'} />
            ) : (
              <img src={CheckDisabledIcon} alt={'checkIcon'} />
            )}
          </checkbox.Indicator>
        </checkbox.Root>
        <label htmlFor="c1" className={s.label}>
          <Typography tag="span" fontStyle={FontStyle.Body2} className={disabled ? s.disabled : ''}>
            {text}
          </Typography>
        </label>
      </div>
    </form>
  )
}
