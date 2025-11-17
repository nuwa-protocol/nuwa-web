import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuwa.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nuwa AI — Open Economy Layer for AI",
    template: "%s | Nuwa AI",
  },
  description:
    "At Nuwa AI, we are building the Open Economy Layer for AI with the foundational payment systems for AI agents.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Nuwa AI — Open Economy Layer for AI",
    description:
      "At Nuwa AI, we are building the Open Economy Layer for AI with the foundational payment systems for AI agents.",
    url: siteUrl,
    siteName: "Nuwa AI",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nuwa",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* Vercel Web Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
