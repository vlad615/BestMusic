import { useQuery } from '@tanstack/react-query'
import './index.css'
import { client } from '@/shared/api'

export function App() {
const query = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      return await client.GET("/playlists", {
        query: { pageNumber: 1, pageSize: 20 },
      })
    },
  })
  return (
    <>
      hi
    </>
  )
}

