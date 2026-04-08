import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const BASE_URL = 'https://altuspoint.health';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: { es: `${BASE_URL}/es`, en: `${BASE_URL}/en` },
      },
    },
    {
      url: `${BASE_URL}/es/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: { es: `${BASE_URL}/es/productos`, en: `${BASE_URL}/en/productos` },
      },
    },
    {
      url: `${BASE_URL}/es/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: { es: `${BASE_URL}/es/blog`, en: `${BASE_URL}/en/blog` },
      },
    },
    {
      url: `${BASE_URL}/es/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: { es: `${BASE_URL}/es/contacto`, en: `${BASE_URL}/en/contacto` },
      },
    },
  ];

  // Product pages
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('active', true);

  const productPages: MetadataRoute.Sitemap = (products || []).map((p) => ({
    url: `${BASE_URL}/es/productos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        es: `${BASE_URL}/es/productos/${p.slug}`,
        en: `${BASE_URL}/en/productos/${p.slug}`,
      },
    },
  }));

  // Blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('published', true);

  const blogPages: MetadataRoute.Sitemap = (posts || []).map((p) => ({
    url: `${BASE_URL}/es/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        es: `${BASE_URL}/es/blog/${p.slug}`,
        en: `${BASE_URL}/en/blog/${p.slug}`,
      },
    },
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
