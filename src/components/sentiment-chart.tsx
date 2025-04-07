"use client"

import React, { useMemo } from "react"
import { LineChart } from "@mui/x-charts/LineChart"
import { Box, useTheme, useMediaQuery } from "@mui/material"
import type { TrendPoint } from "@/lib/types";

interface SentimentChartProps {
  data: TrendPoint[]
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark"

  const { xAxisData, mainSeries, markerSeries } = useMemo(() => {
    const xAxisData = data.map((point) => new Date(point.date))
    const yValues = data.map((point) => point.sentiment)

    const min = Math.min(...yValues)
    const max = Math.max(...yValues)
    const minIndex = yValues.indexOf(min)
    const maxIndex = yValues.indexOf(max)

    return {
      xAxisData,
      mainSeries: {
        data: yValues,
        label: "Sentiment",
        color: theme.palette.primary.main,
        showMark: true,
      },
      markerSeries: [
        {
          data: [min],
          label: "Min",
          color: "red",
          showMark: true,
          pointStyle: "circle",
        },
        {
          data: [max],
          label: "Max",
          color: "green",
          showMark: true,
          pointStyle: "circle",
        },
      ].map((series, idx) => ({
        ...series,
        data: [idx === 0 ? min : max],
        xAxisKey: "minmax",
        xAxis: [new Date(data[idx === 0 ? minIndex : maxIndex].date)],
      })),
    }
  }, [data, theme.palette.primary.main])

  return (
    <Box sx={{ width: "100%", height: isMobile ? 200 : 300 }}>
      <LineChart
        height={isMobile ? 200 : 300}
        xAxis={[
          {
            id: "main",
            data: xAxisData,
            scaleType: "time",
            valueFormatter: (date: Date) =>
              date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          },
          {
            id: "minmax",
            data: xAxisData, // keep x-scale aligned
            scaleType: "time",
            valueFormatter: () => "",
          },
        ]}
        series={[
          { ...mainSeries, xAxisKey: "main" },
          ...markerSeries.map((s) => ({
            ...s,
            type: "line" as const,
            xAxisKey: "minmax",
          })),
        ]}
        margin={{ left: 40, right: 20, top: 20, bottom: 30 }}
        slotProps={{
          legend: { hidden: false },
        }}
        sx={{
          ".MuiLineElement-root": {
            stroke: theme.palette.primary.main,
            strokeWidth: 2,
          },
          ".MuiAreaElement-root": {
            fill: `${theme.palette.primary.main}${isDarkMode ? "40" : "20"}`,
          },
          ".MuiMarkElement-root": {
            stroke: theme.palette.primary.main,
            fill: theme.palette.background.paper,
          },
        }}
      />
    </Box>
  )
})

SentimentChart.displayName = "SentimentChart"

export default SentimentChart
