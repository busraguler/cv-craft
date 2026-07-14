import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Craft",
  description: "Create, preview, manage, and export professional CVs.",
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
