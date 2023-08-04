import {
  ChangeEvent,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useRef,
  useState,
} from 'react'

import s from './TextField.module.scss'

import { ReactComponent as EyeDisabledIcon } from '@/components/ui/TextField/assets/eye-disabled.svg'
import { ReactComponent as EyeHidePassIcon } from '@/components/ui/TextField/assets/eye-off.svg'
import { ReactComponent as EyeIcon } from '@/components/ui/TextField/assets/eye.svg'
import { ReactComponent as XIcon } from '@/components/ui/TextField/assets/xMark.svg'
import { Typography, TypographyVariant } from '@/components/ui/Typography'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute
  label?: string
  errorMessage?: string
  fullWidth?: boolean
  search?: boolean
  disabled?: boolean
  onChangeValue?: (value: string) => void
  customValue?: string
  className?: string
}
export const TextField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      label,
      errorMessage,
      fullWidth,
      disabled,
      search,
      onChangeValue,
      customValue,
      className,
      ...rest
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type)

    const inputRef = useRef<HTMLInputElement>(null)
    const handlerClearInput = () => {
      onChangeValue?.('')
      inputRef.current!.focus()
    }
    const handlerShowPassword = () => {
      setInputType(prevType => (prevType === 'password' ? 'text' : 'password'))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.target.value)
    }

    return (
      <div className={className}>
        {label && (
          <Typography
            tag="span"
            variant={TypographyVariant.Body2}
            className={disabled ? `${s.title} ${s.disabled}` : s.title}
          >
            {label}
          </Typography>
        )}
        <div className={fullWidth ? `${s.inputContainer} ${s.fullWidth}` : s.inputContainer}>
          {customValue && search && <XIcon className={s.xIcon} onClick={handlerClearInput} />}

          {search ? (
            <input
              ref={ref || inputRef}
              value={customValue}
              onChange={onChangeHandler}
              className={
                errorMessage
                  ? `${s.input} ${s.search} ${s.error}`
                  : disabled
                  ? `${s.input} ${s.search} ${s.disabled}`
                  : `${s.input} ${s.search}`
              }
              type={type}
              disabled={disabled}
              {...rest}
            />
          ) : (
            <input
              ref={ref || inputRef}
              value={customValue}
              onChange={onChangeHandler}
              style={type === 'password' ? { paddingRight: '36px' } : undefined}
              className={
                errorMessage
                  ? `${s.input} ${s.error}`
                  : disabled
                  ? `${s.input} ${s.disabled}`
                  : s.input
              }
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
