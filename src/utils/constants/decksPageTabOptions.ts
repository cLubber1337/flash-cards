export type DecksPageTabOptions = {
  value: string
  label: string
}

export enum DecksPageTabValues {
  My = 'my',
  All = 'all',
}
export const decksPageTabOptions: DecksPageTabOptions[] = [
  {
    value: 'all',
    label: 'All Cards',
  },
  {
    value: 'my',
    label: 'My Cards',
  },
]
