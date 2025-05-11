import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FavouritesProvider } from "@/contexts/favourites-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineFlix",
  description: "App to search movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FavouritesProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </FavouritesProvider>
      </body>
    </html>
  );
}
