import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hamson Bitcoin",
    short_name: "Hamson Bitcoin",
    description:
      "UK-focused Bitcoin market, network, wallet guidance and practical learning tools from Hamson Software.",
    start_url: "/bitcoin/",
    scope: "/bitcoin/",
    display: "standalone",
    background_color: "#02040a",
    theme_color: "#02040a",
    icons: [
      {
        src: "/hamson-bitcoin/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/hamson-bitcoin/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}