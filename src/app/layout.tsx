import type { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/util";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://offentlig-lonn.vercel.app"),
  title: "Offentlig lønnsoversikt",
  description:
    "Lønnsoversikt over offentlige stillinger innen IT-utvikling. Finn lønnsinformasjon fra offentlige jobbannonser.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "xzU-LCpk1wvB81RLDdmGOs_Zd0JNTx555tDIT2Ua0-Q",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    url: "/",
    siteName: "Offentlig lønnsoversikt",
    title: "Offentlig lønnsoversikt",
    description:
      "Lønnsoversikt over offentlige stillinger innen IT-utvikling. Finn lønnsinformasjon fra offentlige jobbannonser.",
    locale: "no_NO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col min-h-screen dark:bg-slate-900 antialiased",
        )}
      >
        <Providers>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
