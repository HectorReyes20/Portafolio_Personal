import type { MetadataRoute } from "next";
import { projectsData } from "@/data/portfolio";

const BASE_URL = "https://hector-reyes-dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre-mi`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/proyectos`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.slug}`,
    changeFrequency: "monthly",
    priority: project.featured ? 0.85 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
