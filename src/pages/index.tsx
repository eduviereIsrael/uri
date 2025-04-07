"use client";


import { Box, Button, Container, Typography } from "@mui/material"
import Link from "next/link"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>Hashtag Sentiment Analysis</title>
        <meta name="description" content="Explore sentiment trends for popular hashtags" />
      </Head>
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Hashtag Sentiment Analysis
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Explore sentiment trends for popular hashtags
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 300, mx: "auto" }}>
          <Button component={Link} href="/insights/uri" variant="outlined" size="large">
            View #uri Insights
          </Button>
          <Button component={Link} href="/insights/nextjs" variant="outlined" size="large">
            View #nextjs Insights
          </Button>
          <Button component={Link} href="/insights/react" variant="outlined" size="large">
            View #react Insights
          </Button>
        </Box>
      </Container>
    </>
  )
}
