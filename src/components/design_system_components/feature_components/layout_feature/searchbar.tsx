"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MessageSquareWarning, Search, Store, Warehouse } from "lucide-react";
import Link from "next/link";
import {essential, authServices} from "@/helper/json-helper/menu_data"



//ANCHOR - Menu Data
const menuData = essential
const services = authServices
const Searchbar = () => {
  const pathname = usePathname();
  const [menu, setMenu] = React.useState<any[]>(menuData);
  const [service, setServices] = React.useState<any[]>(services);

  return (
    <div className="flex justify-between gap-4 items-center">
      {/* NOTE - Services */}
      <div className="flex justify-between gap-2">
        {service.map((service:any, i:any) => {
          if (pathname.includes(service.href)) {
            return (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger asChild>
                  <Button className="p-2 bg-transparent hover:bg-transparent text-foreground dark:text-foreground text-md font-semibold">
                    {service.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom">
                  {service.service.map((subService:any, j:any) => (
                    <React.Fragment key={j}>
                      {subService.user_services?.map((userService:any, k:any) => (
                        <DropdownMenuItem key={k}>
                          <Link
                            href={userService.href}
                            className="text-foreground dark:text-foreground text-md font-semibold"
                          >
                            {userService.menu}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <div className="border-b border-gray-300 my-2"/>
                      {subService.admin_services?.map((adminService:any, l:any) => (
                        <DropdownMenuItem key={l}>
                          <Link
                            href={adminService.href}
                            className="text-foreground dark:text-foreground text-md font-semibold"
                          >
                            {adminService.menu}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          return null;
        })}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search Anything . . ."
          className="pl-10 pr-4 py-2 border rounded-md w-full text-foreground dark:text-foreground"
        />
      </div>
      

      {/* NOTE - Essential */}
      <div className="flex justify-between gap-2">
        {menu.map((menu:any, i:any) => (
          <DropdownMenu key={i}>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 bg-transparent hover:bg-transparent text-foreground dark:text-foreground text-md font-semibold">
                {menu.service}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom">
              {menu.subServices.map((services:any, i:any) => (
                <DropdownMenuItem key={i}>
                  <Link
                    href={`${services.link}`}
                    className="text-foreground dark:text-foreground text-md font-semibold"
                  >
                    {services.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
      {/* NOTE - Developer Reports */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-2 bg-transparent hover:bg-transparent text-foreground dark:text-foreground text-md font-semibold">
            <MessageSquareWarning size={24} strokeWidth={2.5} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom">
          <DropdownMenuItem>
            <Link
              href={`#`}
              className="text-foreground dark:text-foreground text-md font-semibold"
            >
              Report&nbsp;Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`#`}
              className="text-foreground dark:text-foreground text-md font-semibold"
            >
              Developer&nbsp;Tickets
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`#`}
              className="text-foreground dark:text-foreground text-md font-semibold"
            >
              Docs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`#`}
              className="text-foreground dark:text-foreground text-md font-semibold"
            >
              Ask&nbsp;For&nbsp;Support
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Searchbar;
