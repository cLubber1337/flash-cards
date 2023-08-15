import * as Tabs from '@radix-ui/react-tabs'

import s from './TabSwitcher.module.scss'

import { DecksPageTabOptions } from '@/utils/constants'

interface TabSwitcherProps {
  disabled?: boolean
  tabs: DecksPageTabOptions[]
  ariaLabel?: string
  onClick: (authorId: string) => void
  authMeId?: string
  defaultValue?: string
}

export const TabSwitcher = ({
  disabled,
  tabs,
  ariaLabel = 'Tab Switcher',
  onClick,
  defaultValue,
}: TabSwitcherProps) => {
  return (
    <Tabs.Root className={s.root} defaultValue={defaultValue}>
      <Tabs.List className={s.list} aria-label={ariaLabel}>
        {tabs.map(({ label, value }: DecksPageTabOptions) => (
          <Tabs.Trigger
            className={disabled ? `${s.trigger} ${s.disabled}` : s.trigger}
            disabled={disabled}
            key={value}
            value={value}
            onClick={() => onClick(value)}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
