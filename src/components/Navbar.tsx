import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { buttonVariants } from "./ui/Button";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="h-14 border-b border-b-slate-200 dark:border-b-slate-700 mb-5">
      <div className="flex justify-between items-center h-full w-full container">
        <div className="flex gap-x-6 text-sm leading-none font-medium">
          <Link href="/">Hjem</Link>
          <Link href="/om">Om siden</Link>
          <Link href="/favoritter">Favoritter</Link>
        </div>
        <div className="space-x-3">
          <a
            href="https://github.com/HermanNygaard/offentlig-lonn"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Github />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
