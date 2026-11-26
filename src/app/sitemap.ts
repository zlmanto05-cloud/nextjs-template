import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.mispapos.com/", changeFrequency: "weekly", priority: 1 },
    { url: "https://www.mispapos.com/membresia", changeFrequency: "monthly", priority: 0.5 },
    { url: "https://www.mispapos.com/aviso-de-privacidad", changeFrequency: "yearly", priority: 0.2 },
  ];
}
