"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
const Header = () => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="h-8 w-8 animate-pulse rounded-full bg-secondary"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  const itemClass = (href) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      path === href
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`;
  return (
    <div className="border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="app-shell flex items-center justify-between gap-4 py-3">
        <Link
          className="hidden text-xl font-semibold tracking-tight text-foreground md:block"
          href="/dashboard"
        >
          PrepWise
        </Link>
        <ul className="hidden md:flex md:items-center md:gap-2">
          <Link href="/dashboard">
            <li className={itemClass("/dashboard")}>Dashboard</li>
          </Link>
          <Link href="/dashboard/question">
            <li className={itemClass("/dashboard/question")}>Questions</li>
          </Link>

          <Link href="/dashboard/upgrade">
            <li className={itemClass("/dashboard/upgrade")}>Upgrade</li>
          </Link>

          <Link href="/dashboard/howit">
            <li className={itemClass("/dashboard/howit")}>How it works?</li>
          </Link>
        </ul>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex gap-10">
          <ModeToggle />
          {isUserButtonLoaded ? <UserButton /> : <SkeletonLoader />}
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="app-shell py-3">
            <ul className="space-y-2">
              <Link href="/dashboard">
                <li className={itemClass("/dashboard")}>Dashboard</li>
              </Link>
              <Link href="/dashboard/question">
                <li className={itemClass("/dashboard/question")}>Questions</li>
              </Link>
              <Link href="/dashboard/upgrade">
                <li className={itemClass("/dashboard/upgrade")}>Upgrade</li>
              </Link>
              <Link href="/dashboard/howit">
                <li className={itemClass("/dashboard/howit")}>How it works?</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
