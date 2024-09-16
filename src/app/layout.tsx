import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/lib/custom_hooks/useSession";

export const metadata: Metadata = {
  title: "AUTHORIZATION",
  description: "Pleasesignin before accessing the system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    className="dark" 
    >
      <body
      className="bg-background dark:bg-background "
      >
        <SessionProvider>
        <main>
        {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  );
}
