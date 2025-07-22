"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Calendar, 
  Home, 
  Inbox, 
  Search, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  History,
  Sword,
  Shield,
  Scroll,
  Users
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/lib/stores/useThemeStore"
import { useHistoryStore } from "@/lib/stores/useHistoryStore"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "References",
    url: "/references",
    icon: Scroll,
  },
  {
    title: "Bestiary",
    url: "/references/bestiary",
    icon: Shield,
  },
  {
    title: "Characters",
    url: "/characters",
    icon: Users,
  },
  {
    title: "Equipment",
    url: "/equipment",
    icon: Sword,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useThemeStore()
  const { history, clearHistory } = useHistoryStore()
  
  // Effect to track page visits
  React.useEffect(() => {
    const { addToHistory } = useHistoryStore.getState()
    
    // Get page title from current route
    const getPageTitle = (path: string) => {
      const item = items.find(item => item.url === path)
      if (item) return item.title
      
      // Handle dynamic routes
      if (path.startsWith('/references/bestiary/')) {
        return 'Monster Details'
      }
      if (path.startsWith('/references/')) {
        return 'References'
      }
      
      return path === '/' ? 'Home' : path.split('/').pop() || 'Unknown'
    }
    
    const title = getPageTitle(pathname)
    
    // Add current page to history
    addToHistory({
      path: pathname,
      title: title,
    })
  }, [pathname])

  const handleLogout = () => {
    // Clear any stored data if needed
    clearHistory()
    // Add your logout logic here (e.g., clear auth tokens, redirect)
    console.log('Logout clicked')
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Scroll className="h-6 w-6" />
          <span className="font-bold text-lg">The Grimoire</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {history.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Recent History</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {history.map((item, index) => (
                    <SidebarMenuItem key={`${item.path}-${index}`}>
                      <SidebarMenuButton asChild>
                        <Link href={item.path}>
                          <History className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun /> : <Moon />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}