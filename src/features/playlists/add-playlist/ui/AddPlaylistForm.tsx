import type { SchemaCreatePlaylistRequestPayload } from '@/shared/api/schema'
import { useForm } from 'react-hook-form'
import { useAddPlaylistMutation } from '../api/use-addplaylist-mutation'

export const AddPlaylistForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SchemaCreatePlaylistRequestPayload>()

  const { mutateAsync, isPending } = useAddPlaylistMutation()

  const onSubmit = async (data: SchemaCreatePlaylistRequestPayload) => {
    try {
      await mutateAsync(data)
      reset()
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Failed to create playlist.',
      })
    }
  }

  return (
    <form
      className="w-full max-w-xl mb-2 space-y-2 rounded-lg border border-border bg-background-menu p-2 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold text-text">Add New Playlist</h2>

      <div className="space-y-1">
        <input
          className="w-full rounded-md border border-border bg-surface px-1.5 py-1 text-text placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
          id="playlist-title"
          placeholder="Playlist title"
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
        className="rounded-md bg-primary px-1.5 py-1 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit">
        {isPending ? 'Creating...' : 'Create playlist'}
      </button>
    </form>
  )
}
