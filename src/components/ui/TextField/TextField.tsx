import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useRef, useState } from 'react'

import s from './TextField.module.scss'

import { ReactComponent as EyeDisabledIcon } from '@/components/ui/TextField/assets/eye-disabled.svg'
import { ReactComponent as EyeHidePassIcon } from '@/components/ui/TextField/assets/eye-off.svg'
import { ReactComponent as EyeIcon } from '@/components/ui/TextField/assets/eye.svg'
import { ReactComponent as XIcon } from '@/components/ui/TextField/assets/xMark.svg'
import { TypographyVariant, Typography } from '@/components/ui/Typography'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  value?: string
  onChange?: (value: string) => void
  type?: HTMLInputTypeAttribute
  title?: string
  error?: string
  fullWidth?: boolean
  search?: boolean
  disabled?: boolean
}
export const TextField = ({
  value,
  onChange,
  type = 'text',
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
    inputRef.current!.focus()
  }
  const handlerShowPassword = () => {
    setInputType(prevType => (prevType === 'password' ? 'text' : 'password'))
  }

  return (
    <div>
      {!!title && (
        <Typography
          tag="span"
          variant={TypographyVariant.Body2}
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
