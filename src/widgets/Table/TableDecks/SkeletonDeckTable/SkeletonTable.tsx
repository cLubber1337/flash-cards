import Skeleton from 'react-loading-skeleton'

import s from '../TableDecks.module.scss'

import { decksHeaderColumns } from '@/utils/constants'
import { TCell } from '@/widgets/Table/TCell/TCell.tsx'
import { THeader } from '@/widgets/Table/THeader/THeader.tsx'
import { TRow } from '@/widgets/Table/TRow/TRow.tsx'

type SkeletonDeckTableProps = {
  count: number
}

export const SkeletonDeckTable = ({ count }: SkeletonDeckTableProps) => {
  const rows = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <table className={s.table}>
      <THeader columns={decksHeaderColumns} />
      <tbody>
        {rows.map(row => {
          return (
            <TRow key={row}>
              <TCell>
                <div className={s.deckName}>
                  <Skeleton width={120} height={48} containerClassName="flex" className={s.img} />
                  <Skeleton width={200} height={24} containerClassName="flex" />
                </div>
              </TCell>
              <TCell>
                <Skeleton width={24} height={24} containerClassName="flex" />
              </TCell>
              <TCell>
                <Skeleton width={75} height={24} containerClassName="flex" />
              </TCell>
              <TCell>
                <Skeleton width={180} height={24} containerClassName="flex" />
              </TCell>
              <TCell>
                <Skeleton width={75} height={24} containerClassName="flex" />
              </TCell>
            </TRow>
          )
        })}
      </tbody>
    </table>
  )
}
