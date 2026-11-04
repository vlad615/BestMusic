import type { SchemaPlaylistListItemResource } from '@/shared/api'
import { DeletePlaylistBtn } from '@/features/playlists/delete-playlist/ui/DeletePlaylistBtn'
import { MenuCard } from '@/entities/playlists'
import { UploadCover } from '@/features/playlists/'
import { useUploadCoverMutation } from '@/features/playlists/upload-cover/api/use-upload-cover-mutation'

type Props = {
  playlist: SchemaPlaylistListItemResource
  onUpdate?: (playlistId: string) => void
}

export const CardPlaylist = ({ playlist, onUpdate }: Props) => {
  const { title, images } = playlist.attributes
  const cover =
    images.main?.find((image) => image.type === 'thumbnail') ??
    images.main?.find((image) => image.type === 'medium') ??
    images.main?.find((image) => image.type === 'original')

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (onUpdate) onUpdate(playlist.id)
  }

  const { mutate, isPending } = useUploadCoverMutation()

  return (
    <article className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      {isPending ? (
        <div
          className="flex aspect-square items-center justify-center bg-background-menu text-text-secondary"
          role="status"
          aria-label="Uploading cover"
        >
          <div className="size-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
        </div>
      ) : cover ? (
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
        <MenuCard
          title={title}
          DeletePlaylistBtn={<DeletePlaylistBtn id={playlist.id} />}
          UploadCoverBtn={<UploadCover id={playlist.id} mutate={mutate} />}
          handleUpdate={handleUpdate}
        />
      )}
    </article>
  )
}
