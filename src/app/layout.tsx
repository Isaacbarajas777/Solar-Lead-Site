import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
