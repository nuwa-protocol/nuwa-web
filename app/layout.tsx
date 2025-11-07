import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "x402 Ecosystem — Programmable Payment Solutions",
    template: "%s | x402",
  },
  description:
    "Explore the x402 ecosystem: x402X for programmable settlements, x402AI for on-chain AI agents, and USDC Faucet for testnet development.",
  openGraph: {
    type: "website",
    title: "x402 Ecosystem — Programmable Payment Solutions",
    description:
      "Building the future of programmable payments with smart contracts and AI agents on blockchain networks.",
    url: siteUrl,
    siteName: "x402 Ecosystem",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nuwa",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
