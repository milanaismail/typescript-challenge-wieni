"use client";
import Link from "next/link";
import { Logo } from "../logo";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navbarStyles = {
  default:
    "relative block border-b border-transparent p-2 text-white transition-all duration-300 ease-in-out hover:border-b-2 hover:border-white md:border-0 md:p-0 md:hover:bg-transparent",
  active: "relative block border-b-2 border-white py-2 text-white underline md:border-0 md:p-0",
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  return (
    <nav className={`p-6 ${isHomepage ? "bg-transparent" : "bg-darkGreen shadow-lg"}`}>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex flex-1 text-white">
          <Logo />
          <span className="sr-only">Wieni</span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          type="button"
          className="relative inline-flex items-center rounded-lg p-2 text-sm  focus:ring-gray-200 md:hidden dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded={open}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`size-6 transition-all duration-300 ease-in-out ${
              open ? "opacity-0 scale-0 rotate-360" : "opacity-100 scale-100 rotate-0"
            }`}
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            className={`size-6 absolute transition-all duration-300 ease-in-out ${
              open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-180"
            }`}
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`} id="mobile-menu">
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium text-white">
            <li>
              <Link
                onClick={() => setOpen(false)}
                data-testid="navbar-link--home"
                href={"/"}
                className={navbarStyles.default}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setOpen(false)}
                data-testid="navbar-link--recipes"
                href={"/recipes"}
                className={navbarStyles.default}
              >
                All recipes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
