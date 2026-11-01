import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";
import { CookieBanner } from "@/components/CookieBanner";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nevadaenergyadvisors.com"),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.brandName,
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.brandName,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Meta Pixel loads only after cookie consent (see src/lib/consent.ts).
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${bricolage.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
        {/* Vercel Web Analytics: first-party, cookieless; disclosed in the Privacy Policy, not consent-gated. */}
        <Analytics />
        {metaPixelId ? <MetaPixel pixelId={metaPixelId} /> : null}
        <CookieBanner />
      </body>
    </html>
  );
}
