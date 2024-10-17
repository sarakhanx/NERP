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
    Workflow,
    TableProperties,
  UserRoundCheck,
  UserPlus,
  GitBranchPlus,
  Store,

} from "lucide-react";

const services = [
  { name: "Position", icon: UserPlus, href: "/nerp/settings/create-position" },
  { name: "Departments", icon: Workflow, href: "/nerp/settings/create-department" },
  { name: "Validation Users", icon: UserRoundCheck, href: "/nerp/settings/validate-user" },
  { name: "List Departments", icon: TableProperties, href: "/nerp/settings/get-departments" },
  { name: "Branches", icon: GitBranchPlus, href: "/nerp/settings/branches" },
  { name: "Listed Branches", icon: Store, href: "/nerp/settings/listed-branches" },
];

const Sidebar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [essenMeu, setEssenMenu] = React.useState<any[]>(services);
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel
          defaultSize={10}
          collapsible={true}
          collapsedSize={5}
          minSize={5}
          maxSize={40}
          className="min-w-[200px]"
        >
          <div className="h-full bg-background dark:bg-background p-4 flex flex-col">
            <nav className="space-y-2">
              <div className="flex flex-col justify-center items-start mb-4 gap-2 border-b border-border">
                {essenMeu.map((essMenu , i)=>(
                    <Button key={i} variant="ghost" className="w-full justify-start" >
                        <Link className="flex" href={essMenu.href}>
                        <essMenu.icon className="h-4 w-4 mr-2 text-foreground dark:text-foreground" />
                            <span className="text-foreground dark:text-foreground">
                                {essMenu.name}
                            </span>
                        </Link>
                    </Button>
                ))}
              </div>
            </nav>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={90}>
          <div className="h-full bg-background dark:bg-background p-4">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Sidebar;
