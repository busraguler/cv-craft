import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CV Craft — Free Online CV Builder & PDF Resume Maker",
    template: "%s | CV Craft",
  },
  description:
    "Create a professional CV online for free. Edit, preview, save, and download a polished PDF resume with CV Craft—no signup required.",
  applicationName: "CV Craft",
  keywords: [
    "free CV builder",
    "online CV maker",
    "resume builder",
    "PDF resume maker",
    "professional CV creator",
  ],
  authors: [{ name: "CV Craft" }],
  creator: "CV Craft",
  publisher: "CV Craft",
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CV Craft",
    title: "CV Craft — Free Online CV Builder",
    description:
      "Build, preview, and download a professional PDF CV for free—no signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Craft — Free Online CV Builder",
    description:
      "Build, preview, and download a professional PDF CV for free—no signup required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-950 flex flex-col">
        {children}
      </body>
    </html>
  );
}
