"use client"

import React, { useMemo, useCallback } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Button,
  Chip,
  useTheme,
} from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"
import RefreshIcon from "@mui/icons-material/Refresh"
import SentimentChart from "./sentiment-chart"
import type { HashtagTrendData } from "@/lib/types"

interface HashtagTrendCardProps {
  data: HashtagTrendData | null
  error: Error | null
  isLoading: boolean
  onRetry: () => void
  hashtag: string
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = React.memo(
  ({ data, error, isLoading, onRetry }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark"

    const trendDirection = useMemo(() => {
      if (!data || data.trend.length < 2) return "flat"

      const first = data.trend[0].sentiment
      const last = data.trend[data.trend.length - 1].sentiment

      return last > first ? "up" : last < first ? "down" : "flat"
    }, [data])

    const getTrendIcon = useCallback(() => {
      switch (trendDirection) {
        case "up":
          return <TrendingUpIcon sx={{ color: theme.palette.success.main }} />
        case "down":
          return <TrendingDownIcon sx={{ color: theme.palette.error.main }} />
        default:
          return <TrendingFlatIcon sx={{ color: theme.palette.text.secondary }} />
      }
    }, [trendDirection, theme])

    const getTrendLabel = useCallback(() => {
      switch (trendDirection) {
        case "up":
          return "Positive trend"
        case "down":
          return "Negative trend"
        default:
          return "Neutral trend"
      }
    }, [trendDirection])

    if (error) {
      return (
        <Card elevation={3} sx={{
          width: "100%",
          mb: 4,
          bgcolor: theme.palette.background.paper,
          borderColor: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "transparent",
          borderWidth: isDarkMode ? 1 : 0,
          borderStyle: "solid",
        }}>
          <CardContent>
            <Typography variant="h5" color="error" gutterBottom>
              Error Loading Data
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {error.message}
            </Typography>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card elevation={3} sx={{ width: "100%", mb: 4 }}>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={300} />
            </>
          ) : data ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {data.hashtag}
                </Typography>
                <Chip
                  icon={getTrendIcon()}
                  label={getTrendLabel()}
                  size="small"
                  sx={{
                    fontWeight: "medium",
                    bgcolor:
                      trendDirection === "up"
                        ? theme.palette.success.light
                        : trendDirection === "down"
                          ? theme.palette.error.light
                          : theme.palette.grey[200],
                  }}
                />
              </Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {data.range}
              </Typography>
              <SentimentChart data={data.trend} />
            </>
          ) : null}
        </CardContent>
      </Card>
    )
  }
)

HashtagTrendCard.displayName = "HashtagTrendCard"

export default HashtagTrendCard
