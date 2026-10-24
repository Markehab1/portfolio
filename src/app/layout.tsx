import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Front-end developer building fast, responsive websites with React, Next.js and TypeScript. Available for freelance projects and internships.";

export const metadata: Metadata = {
  // Turns relative links (like the share image) into full URLs.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mark Ehab — Front-End Developer",
    // Other pages fill in %s, e.g. "Weather App | Mark Ehab"
    template: "%s | Mark Ehab",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Mark Ehab",
    title: "Mark Ehab — Front-End Developer",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes adds the "dark" class before React loads.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only rounded-md bg-accent px-4 py-2 text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
