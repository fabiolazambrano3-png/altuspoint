'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, ArrowLeft, Tag, Loader2, User, Clock, BookOpen } from 'lucide-react';
import type { BlogPost } from '@/types';
import { useParams } from 'next/navigation';
import { BRAND } from '@/lib/constants';

// Simple Markdown renderer
function renderMarkdown(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-navy mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-navy mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-navy mt-10 mb-4">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-6 w-full" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-600">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-gray-600">$1</li>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue pl-4 italic text-gray-500 my-4">$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Line breaks (double newline = paragraph)
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
    // Single newlines
    .replace(/\n/g, '<br />');

  // Wrap in paragraphs
  html = '<p class="text-gray-600 leading-relaxed mb-4">' + html + '</p>';

  // Wrap consecutive <li> in <ul>
  html = html.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
    if (match.includes('list-decimal')) {
      return '<ol class="my-4 space-y-2">' + match + '</ol>';
    }
    return '<ul class="my-4 space-y-2">' + match + '</ul>';
  });

  return html;
}

export default function BlogPostPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?slug=${slug}`);
        const data = await res.json();
        setPost(data.post || null);

        // Fetch all posts for related
        const allRes = await fetch('/api/blog');
        const allData = await allRes.json();
        const others = (allData.posts || []).filter((p: BlogPost) => p.slug !== slug);
        setRelatedPosts(others.slice(0, 3));
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-navy mb-2">{t('not_found')}</h1>
        <p className="text-gray-500 mb-6">{t('not_found_hint')}</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue hover:underline font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back_to_blog')}
        </Link>
      </div>
    );
  }

  const title = locale === 'en' ? (post.title_en || post.title_es) : post.title_es;
  const content = locale === 'en' ? (post.content_en || post.content_es) : post.content_es;
  const excerpt = locale === 'en' ? (post.excerpt_en || post.excerpt_es) : post.excerpt_es;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-VE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Estimated reading time
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: post.featured_image || `https://altuspoint.health/images/og-default.png`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: post.author_name || BRAND.name,
      url: 'https://altuspoint.health',
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      logo: {
        '@type': 'ImageObject',
        url: 'https://altuspoint.health/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://altuspoint.health/${locale}/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-light-blue to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-blue hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('back_to_blog')}
            </Link>

            {/* Tags */}
            {(post.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue/10 text-blue uppercase tracking-wider"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy leading-tight">
              {title}
            </h1>

            {excerpt && (
              <p className="text-gray-500 text-lg mt-4 leading-relaxed">{excerpt}</p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author_name || 'AltusPoint'}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime} min {locale === 'en' ? 'read' : 'de lectura'}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.featured_image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-display font-bold text-navy mb-8">
                {t('related_posts')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => {
                  const rpTitle = locale === 'en' ? (rp.title_en || rp.title_es) : rp.title_es;
                  const rpExcerpt = locale === 'en' ? (rp.excerpt_en || rp.excerpt_es) : rp.excerpt_es;
                  return (
                    <Link
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-light-blue to-blue/10 overflow-hidden">
                        {rp.featured_image ? (
                          <img src={rp.featured_image} alt={rpTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-blue/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-navy group-hover:text-blue transition-colors line-clamp-2">
                          {rpTitle}
                        </h3>
                        {rpExcerpt && (
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{rpExcerpt}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
