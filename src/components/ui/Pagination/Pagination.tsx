import s from './Pagination.module.scss'

import { Select } from '@/components/ui'

interface PaginationProps {}

export const Pagination = ({}: PaginationProps) => {
  return (
    <div className={s.pagination}>
      PAGINATION
      <div className={s.select}>
        <Select
          items={[
            { id: 1, title: '3' },
            { id: 2, title: '5' },
            { id: 3, title: '8' },
          ]}
          fullWidth
          pagination
        />
      </div>
    </div>
  )
}
