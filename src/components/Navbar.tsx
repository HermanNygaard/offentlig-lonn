import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="h-14 border-b border-b-slate-200 dark:border-b-slate-700 mb-5">
      <div className="flex justify-between items-center h-full w-full container">
        <div className="flex gap-x-8 text-sm leading-none font-medium">
          <Link href="/">Hjem</Link>
          <Link href="/om">Om siden</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
