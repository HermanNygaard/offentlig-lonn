import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Inter } from "next/font/google";
import { cn } from "@/lib/util";

/* const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
}); */

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false}>
      {/*    <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style> */}
      <div
        className={cn(
          "flex flex-col min-h-screen dark:bg-slate-900 antialiased"
        )}
      >
        <Navbar />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
