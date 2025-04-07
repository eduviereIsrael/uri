import useSWR from 'swr'
import type { HashtagTrendData } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
})

export function useHashtagTrends(hashtag: string) {
  const { data, error, isLoading, mutate } = useSWR<HashtagTrendData>(
    hashtag ? `/api/trends/${hashtag}` : null,
    fetcher
  )

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
