import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api'
import { Pagination } from '@/shared/ui'
import { useState, type ChangeEvent } from 'react'
import { CardPlaylist } from './CardPlaylist'

type Props = {
  userId?: string
  onPlaylistSelected?: (playlistId: string) => void
}

export const Playlists = ({ userId, onPlaylistSelected }: Props) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [search, setSearch] = useState('')

  const query = useQuery({
    queryKey: ['playlists', { pageNumber, search, userId }],
    queryFn: async ({ signal }) => {
      const responce = await client.GET('/playlists', {
        params: {
          query: { pageNumber, search, userId },
        },
        signal,
      })
      if (responce.error) {
        throw (responce as unknown as { error: Error }).error.message
      }
      return responce.data
    },
    placeholderData: keepPreviousData,
  })

  if (query.isPending) return <span>Loading</span>
  if (query.isError) return <span>{JSON.stringify(query.error.message)}</span>

  return (
    <section className="mb-10">
      <input
        className="w-full max-w-md rounded-md border border-border bg-surface px-1.5 py-0.5 mb-2 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
        placeholder={'search...'}
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {query.data?.data.map((i) => (
          <CardPlaylist key={i.id} playlist={i} onUpdate={onPlaylistSelected} />
        ))}
      </div>

      <Pagination pagesCount={query.data.meta.pagesCount} currentPage={pageNumber} onPageNumberChange={setPageNumber} />
    </section>
  )
}
