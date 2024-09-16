import type { Metadata } from "next";
import { SessionProvider } from "@/lib/custom_hooks/useSession";
import ProdLayout from "@/components/prod_ui/layout_ui/navigation_components/ProdLayout";
import DynamicBreadcrumb from "@/components/client_component/layout_components/Breadcrumb";

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
    <SessionProvider>
      <ProdLayout>
        <DynamicBreadcrumb />
        <main>{children}</main>
      </ProdLayout>
    </SessionProvider>
  );
}
