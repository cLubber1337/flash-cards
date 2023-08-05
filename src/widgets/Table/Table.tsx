import { memo } from 'react'

import s from './Table.module.scss'

import { TableHeader } from '@/widgets/Table/TableHeader/TableHeader.tsx'
import { TableRow } from '@/widgets/Table/TableRow/TableRow.tsx'

interface TableProps {}

export const Table = memo(({}: TableProps) => {
  return (
    <table className={s.table}>
      <tbody>
        <TableHeader />
        <TableRow createdBy="John" lastUpdate="12.12.2022" numberOfCards={4} packName="Packs" />
        <TableRow createdBy="John" lastUpdate="12.12.2022" numberOfCards={4} packName="Packs" />
        <TableRow createdBy="John" lastUpdate="12.12.2022" numberOfCards={4} packName="Packs" />
        <TableRow createdBy="John" lastUpdate="12.12.2022" numberOfCards={4} packName="Packs" />
        <TableRow createdBy="John" lastUpdate="12.12.2022" numberOfCards={4} packName="Packs" />
      </tbody>
    </table>
  )
})
