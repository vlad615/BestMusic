import { Pagination } from '@/shared/ui'
import { useState, type ChangeEvent } from 'react'
import { useQueryPlaylists } from '../api/use-query-playlists'
import { CardPlaylist } from './CardPlaylist'

type Props = {
  userId?: string
  onPlaylistSelected?: (playlistId: string) => void
  isSearchActive?: boolean
}

export const Playlists = ({ userId, onPlaylistSelected, isSearchActive }: Props) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isPending, isError, error } = useQueryPlaylists(userId, pageNumber, search)

  if (isPending) return <span>Loading</span>
  if (isError) return <span>{JSON.stringify(error.message)}</span>

  return (
    <section className="mb-10">
      {isSearchActive && (
        <input
          className="w-full max-w-md rounded-md border border-border bg-surface px-1.5 py-0.5 mb-2 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
          placeholder={'search...'}
        />
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.data.map((i) => (
          <CardPlaylist key={i.id} playlist={i} onUpdate={onPlaylistSelected} />
        ))}
      </div>

      <Pagination pagesCount={data.meta.pagesCount} currentPage={pageNumber} onPageNumberChange={setPageNumber} />
    </section>
  )
}
