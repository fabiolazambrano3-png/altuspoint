import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BlogPostClient from './BlogPostClient';

const BASE_URL = 'https://altuspoint.health';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getPost(slug: string) {
  try {
    const supabase = await createClient();
    const { data: post } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  const isEs = locale === 'es';

  if (!post) {
    return {
      title: isEs ? 'Artículo no encontrado' : 'Article not found',
    };
  }

  // Use meta fields from DB if available, otherwise fallback to title/excerpt
  const title = isEs
    ? (post.meta_title_es || post.title_es)
    : (post.meta_title_en || post.title_en || post.title_es);
  const description = isEs
    ? (post.meta_description_es || post.excerpt_es)
    : (post.meta_description_en || post.excerpt_en || post.excerpt_es);
  const image = post.featured_image || `${BASE_URL}/opengraph-image`;

  return {
    title,
    description: description?.substring(0, 160),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        es: `${BASE_URL}/es/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: description?.substring(0, 160),
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      type: 'article',
      images: [{ url: image, alt: title }],
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author_name || 'AltusPoint'],
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
