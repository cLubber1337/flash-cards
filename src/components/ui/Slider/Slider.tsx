import { useState } from 'react'

import * as slider from '@radix-ui/react-slider'

import s from './Slider.module.scss'

import { TypographyVariant, Typography } from '@/components/ui/Typography'

interface SliderProps {
  defaultValue?: [number, number]
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
}

export const Slider = ({ defaultValue, max, step = 1, minStepsBetweenThumbs = 1 }: SliderProps) => {
  const [value, setValue] = useState(defaultValue)
  const handlerChangeValue = (v: [number, number]) => {
    setValue(v)
  }

  return (
    <form className={s.form}>
      <div className={s.volume}>
        <Typography variant={TypographyVariant.Body1}>{value![0]}</Typography>
      </div>
      <slider.Root
        className={s.root}
        defaultValue={defaultValue}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        onValueChange={handlerChangeValue}
      >
        <slider.Track className={s.track}>
          <slider.Range className={s.range} />
        </slider.Track>
        <slider.Thumb className={s.thumb} aria-label="Volume0" />
        <slider.Thumb className={s.thumb} aria-label="Volume1" />
      </slider.Root>
      <div className={s.volume}>
        <Typography variant={TypographyVariant.Body1}>{value![1]}</Typography>
      </div>
    </form>
  )
}
