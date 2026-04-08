import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - List published blog posts (public) or single post by slug
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get single published post by slug
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error || !post) {
        return NextResponse.json({ post: null });
      }

      return NextResponse.json({ post });
    }

    // Get all published posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Fetch blog posts error:', error);
      return NextResponse.json({ posts: [] });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (err) {
    console.error('Blog API error:', err);
    return NextResponse.json({ posts: [] });
  }
}
