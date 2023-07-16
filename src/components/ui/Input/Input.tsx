import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useRef } from 'react'

import { FontStyle, Typography } from '../Typography'

import s from './Input.module.scss'

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
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }
  const handlerClearInput = () => {
    onChange?.('')
    if (inputRef.current !== null) {
      inputRef.current.focus()
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className={fullWidth ? `${s.inputForm} ${s.fullWidth}` : s.inputForm}>
      {!!title && !search && (
        <Typography
          tag="span"
          fontStyle={FontStyle.Body2}
          className={disabled ? s.disabled : s.title}
        >
          {title}
        </Typography>
      )}
      {!!value && search && <div className={s.xMark} onClick={handlerClearInput} />}

      {search ? (
        <input
          ref={inputRef}
          className={
            // eslint-disable-next-line no-nested-ternary
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
          className={
            // eslint-disable-next-line no-nested-ternary
            error ? `${s.input} ${s.error}` : disabled ? `${s.input} ${s.disabled}` : s.input
          }
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          {...rest}
        />
      )}
      <div className={s.password}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {type === 'password' && disabled ? (
          <div className={`${s.eye} ${s.disabled}`} />
        ) : type === 'password' ? (
          <div className={s.eye} />
        ) : null}
      </div>
      {!!error && <span className={s.errorText}>{error}</span>}
    </form>
  )
}
