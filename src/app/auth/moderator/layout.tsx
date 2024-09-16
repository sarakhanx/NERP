import type { Metadata } from "next";
import { SessionProvider } from "@/lib/custom_hooks/useSession";

export const metadata: Metadata = {
  title: "Moderator | NERP",
  description: "The enterprise resource planning system for Need Company.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
        <main>
        {children}
        </main>
    </SessionProvider>
  );
}
