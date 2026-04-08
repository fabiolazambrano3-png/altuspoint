'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Calendar, ArrowRight, Tag, Loader2, Search, BookOpen } from 'lucide-react';
import type { BlogPost } from '@/types';

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Collect all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));

  const filteredPosts = posts.filter((p) => {
    const title = locale === 'en' ? (p.title_en || p.title_es) : p.title_es;
    const excerpt = locale === 'en' ? (p.excerpt_en || p.excerpt_es) : p.excerpt_es;

    const matchesSearch =
      !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesTag = !selectedTag || (p.tags || []).includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-VE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-light-blue to-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {t('label')}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-navy">
            {t('title')}
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Tags */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/50"
            />
          </div>
        </div>

        {/* Tag filter chips */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedTag('')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !selectedTag ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('all')}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue" />
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t('no_posts')}</p>
            <p className="text-gray-400 text-sm mt-2">{t('no_posts_hint')}</p>
          </div>
        )}

        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const title = locale === 'en' ? (post.title_en || post.title_es) : post.title_es;
              const excerpt = locale === 'en' ? (post.excerpt_en || post.excerpt_es) : post.excerpt_es;

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-light-blue to-blue/10 overflow-hidden">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    {(post.tags || []).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue/10 text-blue uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="font-display font-bold text-navy text-lg leading-snug group-hover:text-blue transition-colors line-clamp-2">
                      {title}
                    </h2>

                    {excerpt && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.published_at)}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue group-hover:gap-2 transition-all">
                        {t('read_more')}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
