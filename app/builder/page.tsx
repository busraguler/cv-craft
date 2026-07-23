import type { Metadata } from "next";
import { BuilderCvCraft } from "@/components/builder/BuilderCvCraft";

export const metadata: Metadata = {
  title: "Free CV Builder",
  description:
    "Create and edit your professional CV online, preview it instantly, and download it as a polished PDF for free.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "Free Online CV Builder | CV Craft",
    description:
      "Create, preview, and download a professional PDF CV for free.",
    url: "/builder",
  },
};

export default function BuilderPage() {
  return <BuilderCvCraft />;
}
