'use client'

import { useState, useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Home, User, Settings, Lock, PanelLeftClose, PanelLeftOpen, Palette } from "lucide-react"
import NavbarComponent from './NavbarComponent'

export default function SidebarComponent(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (<NavbarComponent>
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel
        defaultSize={20}
        collapsible={true}
        collapsedSize={5}
        minSize={5}
        maxSize={40}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className={isCollapsed ? 'min-w-[50px]' : 'min-w-[200px]'}
      >
        <div className="h-full bg-background dark:bg-background p-4 flex flex-col">
          <nav className="space-y-2">
          <div className="flex flex-col justify-center items-start mb-4 gap-2">
            <Button
              size="icon"
              onClick={toggleSidebar}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className='bg-transparent hover:bg-transparent'
            >
              {isCollapsed ? <PanelLeftClose className="h-8 w-8 text-chart-3 font-bold" /> : <PanelLeftOpen className="h-8 w-8 text-chart-3 font-bold" />}
            </Button>
            <h2 className={`text-lg font-semibold text-center text-foreground dark:text-foreground ${isCollapsed ? 'sr-only' : ''}`}>N | ERP</h2>
          </div>
          
            <Button variant="ghost" className="w-full justify-start" size={isCollapsed ? 'icon' : 'default'}>
              <Home className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
              {!isCollapsed && <span className="text-foreground dark:text-foreground">Home</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start" size={isCollapsed ? 'icon' : 'default'}>
              <User className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
              {!isCollapsed && <span className="text-foreground dark:text-foreground">Dashboard</span>}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start" size={isCollapsed ? 'icon' : 'default'}>
                  <Settings className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                  {!isCollapsed && <span className="text-foreground dark:text-foreground">Settings</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                  <span className="text-foreground dark:text-foreground">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Lock className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                  <span className="text-foreground dark:text-foreground">Privacy Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="w-full justify-start" size={isCollapsed ? 'icon' : 'default'}>
              <Palette className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
              {!isCollapsed && <span className="text-foreground dark:text-foreground">Design System</span>}
            </Button>
          </nav>
        </div>
      </ResizablePanel>
      
      {!isMobile && <ResizableHandle withHandle />}
      
      <ResizablePanel defaultSize={80}>
        <div className="h-full bg-background dark:bg-background p-4">
            {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
    </NavbarComponent>
  )
}