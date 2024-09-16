import type { Metadata } from "next";
import SidebarComponent from "@/components/client_component/layout_components/SidebarComponent";

export const metadata: Metadata = {
  title: "NERP",
  description: "The enterprise resource planning system for Need Company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SidebarComponent>
        {children}
        </SidebarComponent>
  );
}
