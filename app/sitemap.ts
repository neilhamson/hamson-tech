import type { MetadataRoute } from "next";

const siteUrl = "https://hamson.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-14",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/machine-intelligence`,
      lastModified: "2026-09-14",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/bitcoin`,
      lastModified: "2026-09-14",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: "2026-09-14",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: "2026-09-14",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: "2026-09-14",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: "2026-09-14",
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
