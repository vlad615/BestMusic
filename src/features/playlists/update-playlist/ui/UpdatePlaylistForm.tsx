import type { SchemaCreatePlaylistRequestPayload, SchemaUpdatePlaylistRequestPayload } from '@/shared/api/schema'
import { useForm } from 'react-hook-form'
import { useUpdatePlaylistMutation } from '../api/use-update-mutation'
import { usePlaylistQuery } from '@/entities/playlists'

type Props = {
  playlistId: string
  onCancel: () => void
}

export const UpdatePlaylistForm = ({ playlistId, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaUpdatePlaylistRequestPayload>()

  const { data, isPending, isError } = usePlaylistQuery(playlistId)
  const { mutate } = useUpdatePlaylistMutation({ onSuccess: onCancel })

  const onSubmit = async (data: SchemaUpdatePlaylistRequestPayload) => {
    mutate({ playlistId, ...data })
  }

  if (isPending) return <></>
  if (isError) return <p>Error...</p>

  return (
    <form
      className="absolute z-50 top-1/2 left-1/2 -translate-1/2 max-h-max w-11/12 max-w-xl mb-2 space-y-2 rounded-lg border border-border bg-background-menu p-2 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-text">Edit Playlist</h2>
        <button
          className="flex size-4 cursor-pointer items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-primary"
          type="button"
          onClick={onCancel}>
          <svg
            aria-hidden="true"
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="space-y-1">
        <input
          className="w-full rounded-md border border-border bg-surface px-1.5 py-1 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
          id="playlist-title"
          autoFocus
          placeholder="Playlist title"
          defaultValue={data.data.attributes.title}
          {...register('data.attributes.title', {
            required: 'Enter a playlist title.',
            maxLength: { value: 100, message: 'Title must be 100 characters or fewer.' },
            validate: (value) => value.trim().length > 0 || 'Title cannot be blank.',
          })}
        />
        {errors.data?.attributes?.title && (
          <p className="text-sm text-red-400" id="playlist-title-error" role="alert">
            {errors.data.attributes.title.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <textarea
          className="min-h-24 w-full resize-y rounded-md border border-border bg-surface px-1.5 py-1 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
          id="playlist-description"
          placeholder="Describe your playlist (optional)"
          defaultValue={data.data.attributes.description || ''}
          {...register('data.attributes.description', {
            maxLength: { value: 1000, message: 'Description must be 1000 characters or fewer.' },
          })}
        />
        {errors.data?.attributes?.description && (
          <p className="text-sm text-red-400" id="playlist-description-error" role="alert">
            {errors.data.attributes.description.message}
          </p>
        )}
      </div>

      {errors.root?.server && (
        <p className="text-sm text-red-400" role="alert">
          {errors.root.server.message}
        </p>
      )}

      <button
        className="cursor-pointer rounded-md bg-primary px-1.5 py-1 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit">
        Update
      </button>
    </form>
  )
}
