import * as Tabs from '@radix-ui/react-tabs'

import s from './TabSwitcher.module.scss'

interface TabSwitcherProps {
  disabled?: boolean
  tabs: string[]
  ariaLabel?: string
}

export const TabSwitcher = ({ disabled, tabs, ariaLabel = 'Tab Switcher' }: TabSwitcherProps) => {
  return (
    <Tabs.Root className={s.root} defaultValue={tabs[0]}>
      <Tabs.List className={s.list} aria-label={ariaLabel}>
        {tabs.map(tab => (
          <Tabs.Trigger
            className={disabled ? `${s.trigger} ${s.disabled}` : s.trigger}
            disabled={disabled}
            key={tab}
            value={tab}
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
