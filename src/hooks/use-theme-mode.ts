"use client"

import { useState, useEffect, createContext, useContext } from "react"

type ThemeMode = "light" | "dark"

type ThemeModeContextType = {
  mode: ThemeMode
  toggleThemeMode: () => void
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleThemeMode: () => {},
})

export const useThemeMode = () => useContext(ThemeModeContext)

export function useThemeModeProvider(): ThemeModeContextType {
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    // Get saved theme from localStorage or use system preference
    const savedMode = localStorage.getItem("themeMode") as ThemeMode
    if (savedMode) {
      setMode(savedMode)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark")
    }
  }, [])

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("themeMode", mode)
    // Apply theme class to document
    document.documentElement.classList.toggle("dark", mode === "dark")
  }, [mode])

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  return { mode, toggleThemeMode }
}

