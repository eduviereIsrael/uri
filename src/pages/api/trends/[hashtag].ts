import type { NextApiRequest, NextApiResponse } from "next"
import type { HashtagTrendData } from "@/lib/types"

const trendData = {
  uri: {
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
  },
  nextjs: {
    hashtag: "#nextjs",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.3 },
      { date: "2025-04-02", sentiment: 0.4 },
      { date: "2025-04-03", sentiment: 0.2 },
      { date: "2025-04-04", sentiment: 0.1 },
      { date: "2025-04-05", sentiment: 0.3 },
      { date: "2025-04-06", sentiment: 0.5 },
      { date: "2025-04-07", sentiment: 0.6 },
    ],
  },
  react: {
    hashtag: "#react",
    range: "Apr 1 - Apr 7, 2025",
    trend: [
      { date: "2025-04-01", sentiment: 0.1 },
      { date: "2025-04-02", sentiment: 0.2 },
      { date: "2025-04-03", sentiment: 0.3 },
      { date: "2025-04-04", sentiment: 0.1 },
      { date: "2025-04-05", sentiment: -0.1 },
      { date: "2025-04-06", sentiment: 0.0 },
      { date: "2025-04-07", sentiment: 0.2 },
    ],
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<HashtagTrendData | { error: string }>) {
  setTimeout(() => {
    const { hashtag } = req.query;
    console.log(hashtag);
    const hashtagStr = Array.isArray(hashtag) ? hashtag[0] : hashtag
    const hashtagKey = hashtagStr?.toLowerCase()

    if (!hashtagKey || !trendData[hashtagKey as keyof typeof trendData]) {
      return res.status(404).json({ error: "Hashtag not found" })
    }

    return res.status(200).json(trendData[hashtagKey as keyof typeof trendData])
  }, 1000)
}

