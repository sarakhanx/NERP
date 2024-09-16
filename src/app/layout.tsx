import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en"
    className="dark" 
    >
      <body
      className="bg-background dark:bg-background "
      >
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
