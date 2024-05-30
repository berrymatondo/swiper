import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import AppBar from "@/components/appBarr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cellules d'Impact",
  description: "Plateforme de gestion des cellules d'Impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-neutral-100/30">
        <Providers>
          <AppBar />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
