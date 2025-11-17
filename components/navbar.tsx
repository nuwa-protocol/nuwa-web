"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Container from "./container";
import Logo from "./logo";

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

const LEFT_MENU: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const RIGHT_MENU: MenuItem[] = [
  { label: "Blog", href: "/blog" },
  {
    label: "Github",
    href: "https://github.com/web3templates/stablo-astro",
    external: true,
  },
];

const MOBILE_MENU: MenuItem[] = [...LEFT_MENU, ...RIGHT_MENU];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <Container>
        <nav>
          <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
            <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end md:gap-6">
              {LEFT_MENU.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </div>

            <div className="flex w-full items-center justify-between md:w-auto">
              <Link className="w-28 dark:hidden" href="/" aria-label="Home">
                <Logo />
              </Link>

              <Link
                className="hidden w-28 dark:block"
                href="/"
                aria-label="Home dark"
              >
                <Image
                  src="/logo/dark.svg"
                  alt="Logo dark"
                  width={112}
                  height={32}
                />
              </Link>

              <button
                type="button"
                aria-label="Toggle menu"
                className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden"
                onClick={() => setOpen((current) => !current)}
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <title>Menu</title>
                  <path
                    className={clsx({ hidden: open })}
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                  <path
                    className={clsx({ hidden: !open })}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 1 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                </svg>
              </button>
            </div>

            <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:gap-6">
              {RIGHT_MENU.map((item) => (
                <NavLink key={item.label} item={item} />
              ))}
            </div>
          </div>

          {open ? (
            <div className="mt-2 flex w-full flex-col items-center justify-start gap-1 md:hidden">
              {MOBILE_MENU.map((item) => (
                <NavLink key={item.label} item={item} mobile />
              ))}
            </div>
          ) : null}
        </nav>
      </Container>
    </header>
  );
}

interface NavLinkProps {
  item: MenuItem;
  mobile?: boolean;
}

function NavLink({ item, mobile = false }: NavLinkProps) {
  const className =
    "px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-500 dark:text-gray-400";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label}
        {item.badge && !mobile ? (
          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-200">
            {item.badge}
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <Link className={className} href={item.href as any}>
      {item.label}
      {item.badge && !mobile ? (
        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-200">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}
