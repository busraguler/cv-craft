import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CV Craft — Free Online CV Builder",
    short_name: "CV Craft",
    description:
      "Create, preview, and download a professional PDF CV for free.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#111827",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
