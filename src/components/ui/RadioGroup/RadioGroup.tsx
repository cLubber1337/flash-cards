import * as radioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import { ReactComponent as RadioCheckedDisabledIcon } from './assets/radio-checked-disabled.svg'
import { ReactComponent as RadioCheckedIcon } from './assets/radio-checked.svg'
import s from './RadioGroup.module.scss'

import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface RadioGroupProps {
  disabled?: boolean
  items: { id: number; title: string }[]
  className?: string
  label?: string
  onChangeValue?: (value: string) => void
  onClickItem?: (grade: number) => void
}

export const RadioGroup = ({
  disabled,
  items,
  className,
  label,
  onChangeValue,
  onClickItem,
}: RadioGroupProps) => {
  return (
    <form>
      {label && (
        <Typography variant={TypographyVariant.Subtitle1} className={s.label}>
          {label}
        </Typography>
      )}
      <radioGroup.Root
        className={clsx(s.radioGroup, className)}
        defaultValue="default"
        aria-label="View density"
        disabled={disabled}
        onValueChange={value => onChangeValue?.(value)}
      >
        {items.map(({ id, title }) => (
          <div key={id} className={s.item}>
            <radioGroup.Item
              className={clsx(s.radio, disabled && s.disabled)}
              value={title}
              id={title}
              onClick={() => onClickItem?.(id)}
            >
              <radioGroup.Indicator className={`${s.indicator}`}>
                {disabled ? <RadioCheckedDisabledIcon /> : <RadioCheckedIcon />}
              </radioGroup.Indicator>
            </radioGroup.Item>
            <label htmlFor={title} className={clsx(s.title, disabled && s.disabled)}>
              <Typography variant={TypographyVariant.Body2}>{title}</Typography>
            </label>
          </div>
        ))}
      </radioGroup.Root>
    </form>
  )
}
