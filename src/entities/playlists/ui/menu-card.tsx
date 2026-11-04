type Props = {
  title: string
  DeletePlaylistBtn: React.ReactNode
  UploadCoverBtn: React.ReactNode
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MenuCard = ({ title, DeletePlaylistBtn, UploadCoverBtn, handleUpdate }: Props) => {
  return (
    <details className="absolute right-1 top-1 cursor-pointer">
      <summary
        className="flex size-4 items-center justify-center rounded-full bg-background-menu/90 text-xl leading-none text-text shadow-sm hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
        aria-label={`Options for ${title}`}
        title="Playlist options">
        ⋯
      </summary>
      <div className="absolute right-0 z-10 mt-0.5 rounded-md border border-border bg-background-menu shadow-md max-w-12.5 overflow-hidden">
        <button
          className="whitespace-nowrap rounded w-full px-1.5 py-0.5 text-sm text-red-500 hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleUpdate}>
          Update
        </button>
        {UploadCoverBtn}
        {DeletePlaylistBtn}
      </div>
    </details>
  )
}
