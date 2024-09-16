"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  User,
  Settings,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  ChartColumnStacked,
  Cpu,
  NotebookPen,
  Store,
  Warehouse,

} from "lucide-react";
import useSidebar from "@/lib/custom_hooks/useSidebar";

const essentialMenu = [
  { name: "Home", icon: Home, href: "/nerp" },
  { name: "Dashboard", icon: ChartColumnStacked, href: "/nerp/dashboard" },
  { name: "Settings", icon: Settings, href: "/nerp/settings" },
  { name: "Design System", icon: Palette, href: "/info/design-system" },//No Authorized
];
const departmentMenu = [
  { name: "SALE", icon: Home, href: "/nerp/sales-services" },
  { name: "WAREHOUSE", icon: Warehouse, href: "/nerp/warehouse-services" },
  { name: "MARKETING", icon: Store, href: "/nerp/marketing-services" },
  { name: "ACCOUNTING", icon: NotebookPen, href: "/nerp/accounting-services" },
  {
    name: "IT OFFICE",
    icon:   Cpu,
    href: "/nerp/it-services",
  },
];

const Sidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isCollapsed, isMobile, toggleSidebar, setIsCollapsed } = useSidebar();
  const [essenMeu, setEssenMenu] = React.useState<any[]>(essentialMenu);
  const [deptMenu, setDeptMenu] = React.useState<any[]>(departmentMenu);
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel
          defaultSize={20}
          collapsible={true}
          collapsedSize={5}
          minSize={5}
          maxSize={40}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={isCollapsed ? "min-w-[50px]" : "min-w-[200px]"}
        >
          <div className="h-full bg-background dark:bg-background p-4 flex flex-col">
            <nav className="space-y-2">
              <div className="flex flex-col justify-center items-start mb-4 gap-2 border-b border-border">
                <Button
                  size="icon"
                  onClick={toggleSidebar}
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                  className="bg-transparent hover:bg-transparent"
                >
                  {isCollapsed ? (
                    <PanelLeftClose className="h-8 w-8 text-chart-3 font-bold" />
                  ) : (
                    <PanelLeftOpen className="h-8 w-8 text-chart-3 font-bold" />
                  )}
                </Button>
                <h2
                  className={`text-lg font-semibold text-center text-foreground dark:text-foreground ${
                    isCollapsed ? "sr-only" : ""
                  }`}
                >
                  N | ERP
                </h2>
              </div>

              <div className="flex flex-col justify-center items-start mb-4 gap-2 border-b border-border">
                {essenMeu.map((essMenu , i)=>(
                    <Button key={i} variant="ghost" className="w-full justify-start" size={isCollapsed ? "icon" : "default"}>
                        <Link className="flex" href={essMenu.href}>
                        <essMenu.icon className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                        {!isCollapsed && (
                            <span className="text-foreground dark:text-foreground">
                                {essMenu.name}
                            </span>
                        )}
                        </Link>
                    </Button>
                ))}
              </div>
              <div className="flex flex-col justify-center items-start mb-4 gap-2">
                {deptMenu.map((deptMenu , i)=>( 
                    <Button key={i} variant="ghost" className="w-full justify-start" size={isCollapsed ? "icon" : "default"}>
                        <Link className="flex" href={deptMenu.href}>
                        <deptMenu.icon className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                        {!isCollapsed && (
                            <span className="text-foreground dark:text-foreground">
                                {deptMenu.name}
                            </span>
                        )}
                        </Link>
                    </Button>
                ))}
              </div>
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
    </>
  );
};

export default Sidebar;
