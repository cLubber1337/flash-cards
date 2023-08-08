import s from './Pagination.module.scss'

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/arrowLeft.svg'
import { ReactComponent as ArrowLeftDisIcon } from '@/assets/svg/arrowLeftDis.svg'
import { ReactComponent as ArrowRightIcon } from '@/assets/svg/arrowRight.svg'
import { Select, Typography, TypographyVariant } from '@/components/ui'
import { decksActions } from '@/services/decks/decksSlice.ts'
import { selectItemsPerPage } from '@/services/decks/selectors.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

interface PaginationProps {
  currentPage: number
  totalPages?: number
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(selectItemsPerPage)

  const onClickArrowLeft = () => {
    currentPage > 1 && dispatch(decksActions.setCurrentPage(currentPage - 1))
  }
  const onClickArrowRight = () => {
    currentPage < totalPages! && dispatch(decksActions.setCurrentPage(currentPage + 1))
  }

  const onClickPage = (page: number) => {
    dispatch(decksActions.setCurrentPage(page))
  }

  return (
    <div className={s.pagination}>
      <div className={s.list}>
        {currentPage > 1 ? <ArrowLeftIcon onClick={onClickArrowLeft} /> : <ArrowLeftDisIcon />}
        {[1, 2, 3, 4, 5].map(page => (
          <div
            className={currentPage === page ? `${s.item} ${s.activeItem}` : s.item}
            key={page}
            onClick={() => onClickPage(page)}
          >
            <Typography variant={TypographyVariant.Body2}>{page}</Typography>
          </div>
        ))}
        <ArrowRightIcon onClick={onClickArrowRight} />
      </div>
      <Typography variant={TypographyVariant.Body2}>show </Typography>
      <div className={s.select}>
        <Select
          items={[
            { id: 1, title: '3' },
            { id: 2, title: '5' },
            { id: 3, title: '8' },
          ]}
          currentItem={itemsPerPage}
          onClickItem={title => dispatch(decksActions.setItemsPerPage(title))}
          fullWidth
          pagination
        />
      </div>
      <Typography variant={TypographyVariant.Body2}> per page</Typography>
    </div>
  )
}
