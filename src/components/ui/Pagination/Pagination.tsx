import { memo } from 'react'

import s from './Pagination.module.scss'

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/arrowLeft.svg'
import { ReactComponent as ArrowRightIcon } from '@/assets/svg/arrowRight.svg'
import { Select, Typography, TypographyVariant } from '@/components/ui'
import { paginationRange } from '@/utils/pagination'

interface PaginationProps {
  currentPage: number
  totalPages?: number
  siblingsCount: number
  itemsPerPage: number
  setCurrentPage?: (value: number) => void
  setItemsPerPage?: (value: number) => void
  selectOptions: { id: number; title: string }[]
}

export const Pagination = memo(
  ({
    currentPage,
    totalPages,
    siblingsCount,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    selectOptions,
  }: PaginationProps) => {
    let pages = paginationRange(totalPages!, currentPage, siblingsCount)

    const onClickArrowLeft = () => {
      currentPage > 1 && setCurrentPage?.(currentPage - 1)
    }
    const onClickArrowRight = () => {
      currentPage < totalPages! && setCurrentPage?.(currentPage + 1)
    }

    const onClickPage = (page: number | string) => {
      if (typeof page === 'number') {
        setCurrentPage?.(page)
      }
    }

    return (
      <nav className={s.pagination}>
        <ul className={s.list}>
          {/*-------------------------------------Arrow left------------------------------------------*/}
          <li className={currentPage > 1 ? s.arrow : `${s.arrow} ${s.arrowDisabled}`}>
            <ArrowLeftIcon onClick={onClickArrowLeft} />
          </li>

          {/*-------------------------------------Pages range------------------------------------------*/}

          {pages.map((page, id) => (
            <li
              className={
                typeof page !== 'number'
                  ? s.dots
                  : currentPage === page
                  ? `${s.item} ${s.activeItem}`
                  : s.item
              }
              key={id}
              onClick={() => onClickPage(page)}
            >
              <Typography variant={TypographyVariant.Body2}>{page}</Typography>
            </li>
          ))}

          {/*-------------------------------------Arrow right------------------------------------------*/}
          <li className={currentPage < totalPages! ? s.arrow : `${s.arrow} ${s.arrowDisabled}`}>
            <ArrowRightIcon onClick={onClickArrowRight} />
          </li>
        </ul>

        {/*---------------------------------------Items per page----------------------------------------*/}

        <Typography variant={TypographyVariant.Body2}>show </Typography>
        <div className={s.select}>
          <Select
            options={selectOptions}
            currentItem={itemsPerPage}
            onClickItem={setItemsPerPage}
            fullWidth
            pagination
          />
        </div>
        <Typography variant={TypographyVariant.Body2}> per page</Typography>
      </nav>
    )
  }
)
