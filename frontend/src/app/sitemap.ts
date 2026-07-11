import type { MetadataRoute } from 'next';
import { getPosts } from '@/data/posts';
import { getProjects } from '@/data/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const postUrls: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `https://arturodev.info/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter((project) => project.published)
    .map((project) => ({
      url: `https://arturodev.info/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [
    { url: 'https://arturodev.info', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://arturodev.info/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://arturodev.info/curriculum', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...postUrls,
    ...projectUrls,
  ];
}
