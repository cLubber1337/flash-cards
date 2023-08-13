import _ from 'lodash'

export const paginationRange = (totalPages: number, currentPage: number, siblingsCount: number) => {
  const totalPagesInArray = 7 + siblingsCount

  if (totalPagesInArray >= totalPages) {
    return _.range(1, totalPages + 1)
  }

  let leftSiblingsIndex = Math.max(currentPage - siblingsCount, 1)
  let rightSiblingsIndex = Math.min(currentPage + siblingsCount, totalPages)

  let showLeftDots = leftSiblingsIndex > 2
  let showRightDots = rightSiblingsIndex < totalPages - 2

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblingsCount
    let leftRange = _.range(1, leftItemCount + 1)

    return [...leftRange, ' ...', totalPages]
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblingsCount
    let rightRange = _.range(totalPages - rightItemCount + 1, totalPages + 1)

    return [1, '... ', ...rightRange]
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1)

    return [1, '... ', ...middleRange, ' ...', totalPages]
  }
}
