import { useDeleteMutation } from '../api/use-delete-mutation'

type Props = {
    id: string
}

export const DeletePlaylistBtn = ({ id }: Props) => {
    const { mutate, isPending } = useDeleteMutation()

    return (
        <button
            className="whitespace-nowrap rounded px-1.5 py-0.5 text-sm text-red-500 hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={isPending}
            onClick={() => mutate(id)}>
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    )
}