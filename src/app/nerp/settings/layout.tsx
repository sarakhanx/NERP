'use client'

import SecondSidebar from "@/components/client_component/layout_components/SecondSidebar";
import React from "react";

export default function SettingsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {

    return(
        <SecondSidebar>
            {children}
        </SecondSidebar>
    )
    
}