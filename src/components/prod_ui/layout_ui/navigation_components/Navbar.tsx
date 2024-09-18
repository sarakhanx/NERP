"use client";
import Searchbar from "@/components/design_system_components/feature_components/layout_feature/searchbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Database,
  Home,
  LogOut,
  MessageSquareWarning,
  Store,
  User,
  Warehouse,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";





const Navbar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();
  React.useEffect(() => {
    console.log("pathName is : ",pathName)
  },[pathName])
  
  //NOTE - Searchbar
  // const searchParams = useSearchParams()
  // const search = searchParams.getAll("search")
  // //http://localhost:3000/nerp/dashboard?search=%search-value-will-be-here%
  // console.log(search) //OUTPUT : ["search-value-will-be-here"]

  return (
    <>
      <div className="flex justify-between m-2 border-b border-border rounded-md p-2">
        <nav className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-bold text-foreground dark:text-foreground underline underline-offset-4">
            {pathName.split('/').pop()?.toUpperCase()}
          </h1>
          <div className="flex justify-between">
            <Searchbar />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 bg-transparent hover:bg-transparent text-foreground dark:text-foreground text-md font-semibold">
                <User size={24} strokeWidth={2.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              className="bg-background dark:bg-background"
            >
              <DropdownMenuItem className="flex justify-start gap-4">
                  <User size={18} strokeWidth={2.5} />
                <Link
                  href={`#`}
                  className="text-foreground dark:text-foreground text-md font-semibold"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-start gap-4">
                  <Database size={18} strokeWidth={2.5} />
                <Link
                  href="https://storage.needshopping.co.th"
                  target="_blank"
                  className="text-foreground dark:text-foreground text-md font-semibold"
                >
                  Repository
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-start gap-4">
                  <Home size={18} strokeWidth={2.5} />
                <Link
                  href="https://need.co.th"
                  target="_blank`"
                  className="text-foreground dark:text-foreground text-md font-semibold"
                >
                  NEED.CO.TH
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-start gap-4">
                  <MessageSquareWarning size={18} strokeWidth={2.5} />
                <Link
                  href={`#`}
                  className="text-foreground dark:text-foreground text-md font-semibold"
                >
                  Complaint
                </Link>
              </DropdownMenuItem>
              <hr />
              <DropdownMenuItem className="flex justify-start gap-4">
                  <LogOut size={18} strokeWidth={2.5} />
                <Link
                  href={`#`}
                  className="text-foreground dark:text-foreground text-md font-semibold"
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      {/* NOTE - This is the content of the page */}
      {children}
    </>
  );
};

export default Navbar;
