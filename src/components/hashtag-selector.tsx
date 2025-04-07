"use client"

import type React from "react"
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from "@mui/material"
import { useRouter } from "next/router"

interface HashtagSelectorProps {
  currentHashtag: string
}

const availableHashtags = [
  { value: "uri", label: "#uri" },
  { value: "nextjs", label: "#nextjs" },
  { value: "react", label: "#react" },
]

const HashtagSelector: React.FC<HashtagSelectorProps> = ({ currentHashtag }) => {
  const router = useRouter()

  const handleChange = (event: SelectChangeEvent) => {
    const newHashtag = event.target.value
    router.push(`/insights/${newHashtag}`)
  }

  return (
    <FormControl sx={{ minWidth: 200, mb: 4 }}>
      <InputLabel id="hashtag-select-label">Select Hashtag</InputLabel>
      <Select
        labelId="hashtag-select-label"
        id="hashtag-select"
        value={currentHashtag}
        label="Select Hashtag"
        onChange={handleChange}
      >
        {availableHashtags.map((hashtag) => (
          <MenuItem key={hashtag.value} value={hashtag.value}>
            {hashtag.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default HashtagSelector

