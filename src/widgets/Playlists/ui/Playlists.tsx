import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api'
import { Pagination } from '@/shared/ui'
import { useState, type ChangeEvent } from 'react'

type Props = {
  userId?: string
}

export const Playlists = ({ userId }: Props) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const query = useQuery({
    queryKey: ['playlists', { page, search, userId }],
    queryFn: async ({ signal }) => {
      const responce = await client.GET('/playlists', {
        params: {
          query: { pageNumber: page, search, userId },
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
    <section>
      <input
        className="w-full max-w-md rounded-md border border-border bg-surface px-1.5 py-0.5 mb-2 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
        placeholder={'search...'}
      />

      <ul>
        {query.data?.data.map((i) => (
          <li key={i.id}>{i.attributes.title}</li>
        ))}
      </ul>

      <Pagination
        pagesCount={query.data.meta.pagesCount}
        currentPage={page}
        onPageNumberChange={setPage}
        isFetching={query.isFetching}
      />
    </section>
  )
}
