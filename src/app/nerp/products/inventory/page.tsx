"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./page.css"; // Import the CSS file
import Link from "next/link";
import React from "react";

export default function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [products, setProducts] = useState<any[]>([])

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);


  //Fetching data from API
  const api = process.env.NEXT_PUBLIC_API_URL_D
  React.useEffect(()=>{
    const fetchData = async () =>{
      const resp = await fetch(`${api}/products?page=${currentPage}`)
      const data = await resp.json()
      console.log(data)
      setProducts(data.products)
    }

    fetchData()
  },[currentPage,itemsPerPage])


  // Paginations
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <Button className="bg-primary animate-pulse hover:animate-none text-white">
            <Link className="flex items-center" href="/nerp/products/new-product">
                <Plus className="h-4 w-4" /><span className="hidden md:block prm-r -tracking-tight text-sm">Add Product</span>
            </Link>
        </Button>
        <h3 className="text-2xl font-bold text-foreground dark:text-foreground">
          Inventory
        </h3>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="itemsPerPage"
            className="text-sm text-foreground dark:text-foreground prm-sb -tracking-tight"
          >
            Items per page:
          </label>
          <Input
            id="itemsPerPage"
            type="number"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-32 text-center text-foreground dark:text-foreground text-sm prm-b -tracking-tight"
          />
        </div>
      </div>
      <div className="border rounded-lg">
        <Table className="w-full scroll-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
                Image
              </TableHead>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
                Name
              </TableHead>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
                Description
              </TableHead>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
                Price
              </TableHead>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
              PRODUCT ID
              </TableHead>
              <TableHead className="prm-b -tracking-tight text-foreground dark:text-foreground">
                Category
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product , i) => (
              <TableRow key={product.product_id}>
                <TableCell>
                  <div className="w-[50px] h-[50px] bg-gray-400 rounded-lg animate-pulse" />
                  {/* <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  /> */}
                </TableCell>
                <TableCell className="text-md prm-sb -tracking-tight text-foreground dark:text-foreground">
                  {product.product_name}
                </TableCell>
                <TableCell className="prm-l -tracking-tight text-foreground dark:text-foreground">
                  {parseInt(product.cost).toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
                </TableCell>
                <TableCell className="prm-l -tracking-tight text-foreground dark:text-foreground">
                  {parseInt(product.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}
                </TableCell>
                <TableCell className="prm-l -tracking-tight text-foreground dark:text-foreground">
                  {product.product_id}
                </TableCell>
                <TableCell className="prm-l -tracking-tight text-foreground dark:text-foreground">
                  {product.category}
                </TableCell>
                <TableCell className="text-xs prm-l -tracking-tight text-foreground dark:text-foreground">
                  {product.createdAt}
                </TableCell>
                <TableCell className="text-xs prm-l -tracking-tight text-foreground dark:text-foreground">
                  {product.updatedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of{" "}
          {products.length} products
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-foreground dark:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage - 2 + i;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className="text-foreground dark:text-foreground hover:bg-transparent"
                >
                  {pageNumber}
                </Button>
              );
            }
            return null;
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-foreground dark:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
