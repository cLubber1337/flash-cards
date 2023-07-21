import * as radioGroup from '@radix-ui/react-radio-group'

import { ReactComponent as RadioCheckedDisabledIcon } from './assets/radio-checked-disabled.svg'
import { ReactComponent as RadioCheckedIcon } from './assets/radio-checked.svg'
import s from './RadioGroup.module.scss'

import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface RadioGroupProps {
  disabled?: boolean
}

export const RadioGroup = ({ disabled }: RadioGroupProps) => {
  return (
    <form>
      <radioGroup.Root
        className={s.root}
        defaultValue="default"
        aria-label="View density"
        disabled={disabled}
      >
        {['Default', 'Spacious', 'Always', 'Compact'].map(item => (
          <div style={{ display: 'flex', alignItems: 'center' }} key={item}>
            <radioGroup.Item
              className={disabled ? `${s.item} ${s.disabled}` : `${s.item}`}
              value={item}
              id={item}
            >
              <radioGroup.Indicator className={`${s.indicator}`}>
                {disabled ? (
                  <RadioCheckedDisabledIcon className={s.indicatorIcon} />
                ) : (
                  <RadioCheckedIcon className={s.indicatorIcon} />
                )}
              </radioGroup.Indicator>
            </radioGroup.Item>
            <label className={disabled ? s.labelDisabled : ''} htmlFor={item}>
              <Typography variant={TypographyVariant.Body2}>{item}</Typography>
            </label>
          </div>
        ))}
      </radioGroup.Root>
    </form>
  )
}
