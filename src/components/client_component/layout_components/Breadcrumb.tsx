"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
  export function DynamicBreadcrumb() {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(Boolean);


    return (
       <Breadcrumb>
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink className="text-xs prm-sb -tracking-tighter" href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Separator */}
        <BreadcrumbSeparator />
        {/* Dynamically generate the breadcrumb for each part of the path */}
        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className="text-xs prm-sb -tracking-tighter">
                {/* Make the last part of the path non-clickable */}
                {index === pathParts.length - 1 ? (
                  <BreadcrumbPage className="text-xs prm-sb">{part.toLocaleUpperCase()}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{part}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < pathParts.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
    )
  }
  

export default DynamicBreadcrumb;
