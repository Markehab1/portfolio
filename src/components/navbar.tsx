"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/data/site";
import { CloseIcon, MenuIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Show the bottom border once the page is scrolled down.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // While the menu is open, Escape closes it and moves focus back to the menu button.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const showBorder = scrolled || menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md transition-colors ${
        showBorder ? "border-border" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-5 md:px-8"
      >
        <Link href="/" className="rounded-md font-semibold tracking-tight">
          {profile.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:brightness-90 sm:inline-flex"
          >
            Download CV
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground md:hidden"
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: always in the page, hidden until opened */}
      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-border md:hidden">
        <ul className="mx-auto flex w-full max-w-content flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 sm:hidden">
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition hover:brightness-90"
            >
              Download CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
