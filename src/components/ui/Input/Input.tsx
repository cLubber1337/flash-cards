import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useRef, useState } from 'react'

import { ReactComponent as EyeDisabledIcon } from './assets/eye-disabled.svg'
import { ReactComponent as EyeHidePassIcon } from './assets/eye-off.svg'
import { ReactComponent as EyeIcon } from './assets/eye.svg'
import { ReactComponent as XIcon } from './assets/xMark.svg'
import s from './Input.module.scss'

import { FontStyle, Typography } from '@/components/ui/Typography'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  value?: string
  onChange?: (value: string) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  autoFocus?: boolean
  title?: string
  error?: string
  fullWidth?: boolean
  search?: boolean
  disabled?: boolean
}
export const Input = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  autoFocus,
  title,
  error,
  fullWidth,
  disabled,
  search,
  ...rest
}: InputProps) => {
  const [inputType, setInputType] = useState(type)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const handlerClearInput = () => {
    onChange?.('')
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }
  }
  const handlerShowPassword = () => {
    setInputType(prevType => (prevType === 'password' ? 'text' : 'password'))
  }

  return (
    <div>
      {!!title && (
        <Typography
          tag="span"
          fontStyle={FontStyle.Body2}
          className={disabled ? `${s.title} ${s.disabled}` : s.title}
        >
          {title}
        </Typography>
      )}
      <div className={fullWidth ? `${s.inputContainer} ${s.fullWidth}` : s.inputContainer}>
        {!!value && search && <XIcon className={s.xIcon} onClick={handlerClearInput} />}

        {search ? (
          <input
            ref={inputRef}
            className={
              error
                ? `${s.input} ${s.search} ${s.error}`
                : disabled
                ? `${s.input} ${s.search} ${s.disabled}`
                : `${s.input} ${s.search}`
            }
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            {...rest}
          />
        ) : (
          <input
            style={type === 'password' ? { paddingRight: '36px' } : undefined}
            className={
              error ? `${s.input} ${s.error}` : disabled ? `${s.input} ${s.disabled}` : s.input
            }
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
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
      {!!error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
