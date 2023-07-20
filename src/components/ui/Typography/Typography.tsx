import { ComponentType, createElement, HTMLAttributes, ReactNode } from 'react'

import s from './Typography.module.scss'

import IntrinsicElements = React.JSX.IntrinsicElements

type HTMLTag = keyof IntrinsicElements

export enum TypographyVariant {
  Body1 = 'body-1',
  Body2 = 'body-2',
  Subtitle1 = 'subtitle-1',
  Subtitle2 = 'subtitle-2',
  Caption = 'caption',
  Overline = 'overline',
  Link1 = 'link-1',
  Link2 = 'link-2',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  Large = 'large',
}

interface TypographyProps<T extends HTMLTag | ComponentType<any> = 'p'> extends HTMLAttributes<T> {
  children?: ReactNode
  variant?: TypographyVariant
  tag?: T extends keyof IntrinsicElements ? T : ComponentType<any>
  className?: string
}

export const Typography = <T extends HTMLTag | ComponentType<any> = 'p'>({
  children,
  variant = TypographyVariant.Body1,
  tag: Tag = 'p' as T extends keyof IntrinsicElements ? T : ComponentType<any>,
  className,
  ...rest
}: TypographyProps<T>) => {
  return createElement(Tag, { className: `${s[variant]} ${className}`, ...rest }, children)
}
