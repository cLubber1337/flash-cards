import * as radioGroup from '@radix-ui/react-radio-group'

import { ReactComponent as RadioCheckedDisabledIcon } from './assets/radio-checked-disabled.svg'
import { ReactComponent as RadioCheckedIcon } from './assets/radio-checked.svg'
import s from './RadioGroup.module.scss'

import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface RadioGroupProps {
  disabled?: boolean
  items: { id: number; title: string }[]
}

export const RadioGroup = ({ disabled, items }: RadioGroupProps) => {
  return (
    <form>
      <radioGroup.Root
        className={s.radioGroup}
        defaultValue="default"
        aria-label="View density"
        disabled={disabled}
      >
        {items.map(({ id, title }) => (
          <div key={id} className={s.item}>
            <radioGroup.Item
              className={disabled ? `${s.radio} ${s.disabled}` : `${s.radio}`}
              value={title}
              id={title}
            >
              <radioGroup.Indicator className={`${s.indicator}`}>
                {disabled ? <RadioCheckedDisabledIcon /> : <RadioCheckedIcon />}
              </radioGroup.Indicator>
            </radioGroup.Item>
            <label htmlFor={title} className={disabled ? `${s.label} ${s.disabled}` : s.label}>
              <Typography variant={TypographyVariant.Body2}>{title}</Typography>
            </label>
          </div>
        ))}
      </radioGroup.Root>
    </form>
  )
}
