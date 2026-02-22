import type { Metadata } from "next";
import { ReactNode } from "react";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/util";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Offentlig lønnsoversikt",
  description:
    "Lønnsoversikt over offentlige stillinger innen IT-utvikling. Finn lønnsinformasjon fra offentlige jobbannonser.",
  verification: {
    google: "xzU-LCpk1wvB81RLDdmGOs_Zd0JNTx555tDIT2Ua0-Q",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>",
  },
  openGraph: {
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
