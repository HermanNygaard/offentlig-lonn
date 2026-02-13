import type { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/util";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Offentlig lønnsoversikt",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={cn("flex flex-col min-h-screen dark:bg-slate-900 antialiased")}>
        <Providers>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}