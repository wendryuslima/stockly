import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarLayout from "./_components/sidebar-layout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Stockly",
  description: "Stockly é um sistema de gestão de estoque",
  icons: {
    icon: "/title-stockly.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarLayout>{children}</SidebarLayout>
        <Toaster />
      </body>
    </html>
  );
}
