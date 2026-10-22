import { PaginationNav } from './pagination-nav/PaginationNav'

type Props = {
  currentPage: number
  pagesCount: number
  onPageNumberChange: (page: number) => void
}

export const Pagination = ({ currentPage, pagesCount, onPageNumberChange: changePageNumber }: Props) => {
  return (
    <div className="flex items-center content-center gap-4 mx-auto">
      <PaginationNav current={currentPage} pagesCount={pagesCount} onChange={changePageNumber} />
    </div>
  )
}
