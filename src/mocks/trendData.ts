export type TrendDataPoint = {
    date: string
    sentiment: number
  }
  
  export type TrendData = {
    hashtag: string
    range: string
    trend: TrendDataPoint[]
  }
  
  const defaultTrendData: TrendData = {
    hashtag: "#uri",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: -0.2 },
      { date: "2025-04-02", sentiment: 0.0 },
      { date: "2025-04-03", sentiment: 0.1 },
      { date: "2025-04-04", sentiment: 0.3 },
      { date: "2025-04-05", sentiment: 0.2 },
      { date: "2025-04-06", sentiment: 0.4 },
      { date: "2025-04-07", sentiment: 0.5 },
    ],
  }
  
  const trendDataMap: Record<string, TrendData> = {
    uri: defaultTrendData,
    nextjs: {
      hashtag: "#nextjs",
      range: "Apr 1 - Apr 7, 2025",
      trend: [
        { date: "2025-04-01", sentiment: 0.3 },
        { date: "2025-04-02", sentiment: 0.4 },
        { date: "2025-04-03", sentiment: 0.6 },
        { date: "2025-04-04", sentiment: 0.5 },
        { date: "2025-04-05", sentiment: 0.7 },
        { date: "2025-04-06", sentiment: 0.8 },
        { date: "2025-04-07", sentiment: 0.9 },
      ],
    },
    react: {
      hashtag: "#react",
      range: "Apr 1 - Apr 7, 2025",
      trend: [
        { date: "2025-04-01", sentiment: 0.1 },
        { date: "2025-04-02", sentiment: 0.3 },
        { date: "2025-04-03", sentiment: 0.2 },
        { date: "2025-04-04", sentiment: 0.0 },
        { date: "2025-04-05", sentiment: -0.1 },
        { date: "2025-04-06", sentiment: 0.2 },
        { date: "2025-04-07", sentiment: 0.4 },
      ],
    },
    typescript: {
      hashtag: "#typescript",
      range: "Apr 1 - Apr 7, 2025",
      trend: [
        { date: "2025-04-01", sentiment: 0.5 },
        { date: "2025-04-02", sentiment: 0.4 },
        { date: "2025-04-03", sentiment: 0.3 },
        { date: "2025-04-04", sentiment: 0.2 },
        { date: "2025-04-05", sentiment: 0.1 },
        { date: "2025-04-06", sentiment: 0.0 },
        { date: "2025-04-07", sentiment: -0.1 },
      ],
    },
  }
  
  export function getTrendData(hashtag: string): TrendData {
    // Remove # if present and convert to lowercase
    const normalizedHashtag = hashtag.replace("#", "").toLowerCase()
  
    // Return the data for the hashtag or the default data if not found
    return (
      trendDataMap[normalizedHashtag] || {
        ...defaultTrendData,
        hashtag: `#${normalizedHashtag}`,
      }
    )
  }
  
  export function getAvailableHashtags(): string[] {
    return Object.keys(trendDataMap).map((tag) => `#${tag}`)
  }
  
  