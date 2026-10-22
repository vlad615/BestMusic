import { AddPlaylistForm } from "@/features"
import { useState } from "react"


export const AddPlaylistBtn = () => {
    const [showForm, setShowForm] = useState(false)
    return showForm ? <AddPlaylistForm onClose={() => setShowForm(!showForm)} /> :
        <button
            className="cursor-pointer rounded-md bg-primary px-1 py-0.5 font-semibold text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setShowForm(!showForm)}>
            New playlist
        </button>
}