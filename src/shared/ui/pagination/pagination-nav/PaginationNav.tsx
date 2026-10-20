import { getPaginationPages } from '../utils/get-pagination-pages'

type Props = {
  current: number
  pagesCount: number
  onChange: (page: number) => void
}

const SIBLING_COUNT = 1

export const PaginationNav = ({ current, pagesCount, onChange }: Props) => {
  const pages = getPaginationPages(current, pagesCount, SIBLING_COUNT)

  return (
    <div className="flex justify-center gap-[8px]">
      {pages.map((item, idx) =>
        item === '...' ? (
          <span className="select-none px-1 py-[4px] text-text-secondary" key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`cursor-pointer rounded-sm border border-border bg-transparent px-1 py-[4px] font-normal text-text transition-colors duration-200 ${
              item === current ? 'cursor-default border-primary bg-primary-light font-bold text-text-primary' : ''
            }`}
            onClick={() => item !== current && onChange(Number(item))}
            disabled={item === current}
            type="button">
            {item}
          </button>
        )
      )}
    </div>
  )
}
