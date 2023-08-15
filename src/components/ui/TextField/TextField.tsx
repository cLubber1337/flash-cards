import {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useRef,
  useState,
} from 'react'

import clsx from 'clsx'

import s from './TextField.module.scss'

import { ReactComponent as EyeDisabledIcon } from '@/components/ui/TextField/assets/eye-disabled.svg'
import { ReactComponent as EyeHidePassIcon } from '@/components/ui/TextField/assets/eye-off.svg'
import { ReactComponent as EyeIcon } from '@/components/ui/TextField/assets/eye.svg'
import { ReactComponent as XIcon } from '@/components/ui/TextField/assets/xMark.svg'
import { Typography, TypographyVariant } from '@/components/ui/Typography'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'disabled'>

export type TextFieldProps = {
  type?: HTMLInputTypeAttribute
  label?: string
  errorMessage?: string
  fullWidth?: boolean
  search?: boolean
  className?: string
  disabled?: boolean
  value?: string
  name?: string
  onChange?: (e: string) => void
} & HTMLInputProps
export const TextField = forwardRef<Omit<HTMLInputElement, 'onChange'>, TextFieldProps>(
  (
    {
      type = 'text',
      label,
      errorMessage,
      fullWidth,
      disabled,
      search,
      className = '',
      onChange,
      name,
      value,
      ...rest
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type)

    const inputRef = useRef<HTMLInputElement>(null)
    const handlerClearInput = () => {
      onChange?.('')
      inputRef.current!.focus()
    }
    const handlerShowPassword = () => {
      setInputType(prevType => (prevType === 'password' ? 'text' : 'password'))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const classes = {
      textField: clsx(s.textField, className, { [s.fullWidth]: fullWidth }),
      search: clsx(s.input, s.search, { [s.error]: errorMessage, [s.disabled]: disabled }),
      input: clsx(s.input, errorMessage && s.error, disabled && s.disabled),
      label: clsx(s.label, disabled && s.disabled),
    }

    return (
      <div className={classes.textField}>
        {label && (
          <Typography tag="span" variant={TypographyVariant.Body2} className={classes.label}>
            {label}
          </Typography>
        )}
        <div className={s.inputContainer}>
          {value && search && <XIcon className={s.xIcon} onClick={handlerClearInput} />}

          {search ? (
            <input
              name={name}
              ref={ref || inputRef}
              value={value}
              onChange={onChangeHandler}
              className={classes.search}
              type={type}
              disabled={disabled}
              {...rest}
            />
          ) : (
            <input
              ref={ref || inputRef}
              name={name}
              value={value}
              onChange={onChangeHandler}
              style={type === 'password' ? { paddingRight: '36px' } : undefined}
              className={classes.input}
              type={inputType}
              disabled={disabled}
              {...rest}
            />
          )}

          {type === 'password' && !disabled && (
            <EyeIcon onClick={handlerShowPassword} className={s.eye} />
          )}
          {type === 'password' && !disabled && inputType === 'text' && (
            <EyeHidePassIcon onClick={handlerShowPassword} className={s.eye} />
          )}
          {type === 'password' && disabled && (
            <EyeDisabledIcon onClick={handlerShowPassword} className={s.eye} />
          )}
        </div>
        {errorMessage && <span className={s.errorText}>{errorMessage}</span>}
      </div>
    )
  }
)
