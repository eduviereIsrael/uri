export interface TrendPoint {
    date: string
    sentiment: number
  }
  
  export interface HashtagTrendData {
    hashtag: string
    range: string
    trend: TrendPoint[]
  }
  
  