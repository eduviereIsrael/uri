import dynamic from "next/dynamic"
import { Container, Typography, Box, Button } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { useHashtagTrends } from "@/hooks/use-hashtag-trend"
import Link from "next/link"

const HashtagTrendCard = dynamic(() => import("@/components/hashtag-trend-card"), {
  ssr: false,
  loading: () => <p>Loading chart component...</p>,
})

const HashtagSelector = dynamic(() => import("@/components/hashtag-selector"), {
  ssr: false,
})

export default function HashtagPage() {
  const router = useRouter()
  const { hashtag } = router.query as { hashtag: string }
  const { data, error, isLoading, mutate } = useHashtagTrends(hashtag)

  return (
    <>
      <Head>
        <title>{data?.hashtag || hashtag} Sentiment Insights</title>
        <meta name="description" content={`Sentiment analysis for ${hashtag}`} />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hashtag Sentiment Insights
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View sentiment analysis trends for popular hashtags
          </Typography>
        </Box>

        {/* Back to Home Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Link href="/" passHref>
            <Button variant="outlined" color="primary">
              ← Back to Home
            </Button>
          </Link>
        </Box>

        <HashtagSelector currentHashtag={hashtag} />

        <HashtagTrendCard
          data={data || null}
          error={error || null}
          isLoading={isLoading}
          onRetry={() => mutate()}
          hashtag={hashtag}
        />
      </Container>
    </>
  )
}
