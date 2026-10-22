import type { SchemaPlaylistListItemResource } from '@/shared/api'
import { DeletePlaylistBtn } from '@/features/playlists/delete-playlist/ui/DeletePlaylistBtn'

type Props = {
  playlist: SchemaPlaylistListItemResource
  userId?: string
  onUpdate?: (playlistId: string) => void
}

export const CardPlaylist = ({ playlist, userId, onUpdate }: Props) => {
  const { title, images } = playlist.attributes
  const cover = images.main?.find((image) => image.type === 'thumbnail')
    ?? images.main?.find((image) => image.type === 'medium')
    ?? images.main?.find((image) => image.type === 'original')

  return (
    <article className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      {cover ? (
        <img className="aspect-square w-full object-cover" src={cover.url} alt={`${title} cover`} loading="lazy" />
      ) : (
        <div className="flex aspect-square items-center justify-center bg-background-menu text-text-secondary">
          No cover
        </div>
      )}
      <h2 className="truncate p-2 font-semibold text-text text-center" title={title}>
        {title}
      </h2>

      {onUpdate && (
        <details className="absolute right-1 top-1">
          <summary
            className="flex size-4 cursor-pointer items-center justify-center rounded-full bg-background-menu/90 text-xl leading-none text-text shadow-sm hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
            aria-label={`Options for ${title}`}
            title="Playlist options">
            ⋯
          </summary>
          <div className="absolute right-0 z-10 mt-0.5 rounded-md border border-border bg-background-menu shadow-md">
            <DeletePlaylistBtn id={playlist.id} />
            <button className="whitespace-nowrap rounded px-1.5 py-0.5 text-sm text-red-500 hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => onUpdate(playlist.id)}>
              Update
            </button>
          </div>
        </details>
      )}
    </article>
  )
}
