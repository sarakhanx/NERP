"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for the sitemap
const sitemapData = [
  {
    title: "Products Services essen.",
    items: [
      { name: "สินค้าทั้งหมด", href: "/nerp/products/inventory" },
      { name: "รายการสั่งซื้อ", href: "/nerp/products/ordering" },
      { name: "รายการสั่งซื้อรออนุมัติ", href: "/nerp/products/preorder" },
      { name: "เช็คแต่ละหน้าร้าน", href: "/nerp/products/check-store" },
      { name: "New Product", href: "/nerp/products/new-product" },
    ],
  },
  {
    title: "Warehouse Services",
    items: [
      { name: "Warehouse", href: "/nerp/warehouse-services" },
      { name: "สินค้ารอรับเข้า", href: "/nerp/warehouse-services/products/incoming" },
      { name: "โอนย้ายสินค้า", href: "/nerp/warehouse-services/products/transfer" },
      { name: "เช็คสถานะสินค้า", href: "/nerp/warehouse-services/products/status" },
      { name: "Debug", href: "/nerp/warehouse-services/debug" },
      { name: "สร้างใบรับเข้า", href: "/nerp/warehouse-services/new-pr" },
      { name: "รับสินค้า", href: "/nerp/warehouse-services/products/docstatus/receive" },

    ],
  },
  {
    title: "Sales Services",
    items: [
      { name: "เช็คสินค้า", href: "/nerp/sales-services/products" },
      { name: "รายชื่อลูกค้า", href: "/nerp/sales-services/customers/listed" },
      { name: "สร้างใบขาย", href: "/nerp/sales-services/products/transfer" },
      { name: "สถานะใบขาย", href: "/nerp/sales-services/products/status" },
      { name: "อนุมัติใบขาย", href: "/nerp/sales-services/approve" },
      { name: "ส่งออกข้อมูลต่างๆ", href: "/nerp/sales-services/reports/exports" },
      { name: "รายงานการขาย", href: "/nerp/sales-services/reports/sales" },
    ],
  },
  {
    title: "Essential",
    items: [
      { name: "Target", href: "/nerp/reports/target" },
      { name: "Best Seller", href: "/nerp/reports/bestseller" },
      { name: "Statics", href: "/nerp/reports/statics" },
      { name: "Inventory", href: "/nerp/products/inventory" },
      { name: "Order", href: "/nerp/products/ordering" },
      { name: "Preorder Listed", href: "/nerp/products/preorder" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { name: "Essential", href: "/nerp/configuration/essential" },
      { name: "Setting Application", href: "/nerp/configuration/setting" },
    ],
  },
  {
    title: "Default Menu",
    items: [
      { name: "Home", href: "/nerp/" },
      { name: "Dashboard", href: "/nerp/dashboard" },
      { name: "Design System", href: "/nerp/info/design-system" },
      { name: "Setting Application", href: "/nerp/configuration" },
    ],
  },
];

export default function ModernSitemap() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSitemapData = sitemapData
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground dark:text-foreground">
        Sitemap
      </h1>
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search sitemap..."
            className="pl-10 pr-4 py-2 w-full dark:bg-gray-800 dark:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredSitemapData.map((section, index) => (
          <Collapsible key={index} className="border border-border rounded-md p-2">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between font-semibold text-lg mb-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground dark:text-foreground"
              >
                {section.title}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 text-foreground dark:text-foreground" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-400" />
                  <span className="text-foreground dark:text-foreground">
                    {item.name}
                  </span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
