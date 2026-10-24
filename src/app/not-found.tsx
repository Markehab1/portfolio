import type { Metadata } from "next";
import Link from "next/link";
import { buttonPrimary } from "@/components/styles";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-content flex-col items-start px-5 py-24 md:px-8 md:py-32">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-muted">This page doesn&apos;t exist or was moved.</p>
      <Link href="/" className={`${buttonPrimary} mt-8`}>
        Back to home
      </Link>
    </section>
  );
}
