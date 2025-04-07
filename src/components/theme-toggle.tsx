"use client"

import { IconButton, Tooltip } from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useThemeMode } from "@/hooks/use-theme-mode"

export default function ThemeToggle() {
  const { mode, toggleThemeMode } = useThemeMode()

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton onClick={toggleThemeMode} color="inherit" aria-label="toggle theme">
        {mode === "light" ? (
          <DarkModeIcon sx={{ fontSize: 20 }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  )
}
