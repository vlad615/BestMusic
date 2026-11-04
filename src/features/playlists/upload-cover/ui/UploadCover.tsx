import type { ChangeEvent } from 'react'
import { useUploadCoverMutation } from '../api/use-upload-cover-mutation'

type Props = {
  id: string
  mutate: ReturnType<typeof useUploadCoverMutation>['mutate']
}

export const UploadCover = ({ id, mutate }: Props) => {
  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length && event.target.files[0]
    if (!file) return
    mutate({ file, playlistId: id })
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={uploadCoverHandler}
      title="Upload cover"
      className="whitespace-nowrap cursor-pointer px-1.5 py-0.5 text-sm text-red-500 hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
    />
  )
}
