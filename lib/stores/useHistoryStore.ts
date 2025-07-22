import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface HistoryItem {
  path: string
  title: string
  timestamp: number
}

interface HistoryStore {
  history: HistoryItem[]
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => {
        const { history } = get()
        const timestamp = Date.now()
        
        // Remove existing item with same path if it exists
        const filteredHistory = history.filter(h => h.path !== item.path)
        
        // Add new item to the beginning
        const newHistory = [{ ...item, timestamp }, ...filteredHistory]
        
        // Keep only last 5 items
        const trimmedHistory = newHistory.slice(0, 5)
        
        set({ history: trimmedHistory })
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)