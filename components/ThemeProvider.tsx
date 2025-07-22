"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/lib/stores/useThemeStore"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Apply theme immediately on mount to prevent flashing
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  // Also apply theme on initial load to handle SSR
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme-storage')
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme)
        if (parsed.state?.theme) {
          document.documentElement.classList.remove('light', 'dark')
          document.documentElement.classList.add(parsed.state.theme)
        }
      } catch (error) {
        console.error('Error parsing stored theme:', error)
      }
    }
  }, [])

  return <>{children}</>
}