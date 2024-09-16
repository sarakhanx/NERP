"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MessageSquareWarning, Search } from "lucide-react";
import Link from "next/link";

const menuData = [
  {
    service: "Purchase",
    subServices: [
      {
        name: "Purchase Order",
        link: "#",
      },
      {
        name: "Product",
        link: "#",
      },
      {
        name: "RFQ",
        link: "#",
      },
    ],
  },
  {
    service: "Products",
    subServices: [
      {
        name: "Inventory",
        link: "#",
      },
      {
        name: "Order",
        link: "#",
      },
      {
        name: "Preorder Listed",
        link: "#",
      },
    ],
  },
  {
    service: "Configuration",
    subServices: [
      {
        name: "Essential",
        link: "#",
      },
      {
        name: "Setting",
        link: "#",
      },
    ],
  },
];


const Searchbar = () => {
  // ในอนาคตจะเปลี่ยนเป็นการดึงข้อมูลจากฐานข้อมูล
  const [menu, setMenu] = React.useState(menuData);

  return (
    <div className="flex justify-between gap-4 items-center">
      {/* //NOTE - 1 ปุ่ม Dropdown ถ้าหากมีหลายปุ่มก็สร้างปุ่มนี้ซ้ำไปเรื่อยๆ หรืออาจจะใช้ map method ก็ได้*/}
      <div className="flex justify-between gap-2">
        {menu.map((menu, i) => (
          <DropdownMenu key={i}>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 bg-transparent hover:bg-transparent text-foreground dark:text-foreground text-md font-semibold">
                {menu.service}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom">
              {menu.subServices.map((services, i) => (
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search Anything . . ."
          className="pl-10 pr-4 py-2 border rounded-md w-full text-foreground dark:text-foreground"
        />
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
