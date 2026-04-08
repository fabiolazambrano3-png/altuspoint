import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// GET - List all blog posts (admin: includes drafts)
export async function GET() {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch blog posts error:', error);
      return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (err) {
    console.error('Blog API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new blog post
export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;
    const body = await request.json();

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        title_es: body.title_es,
        title_en: body.title_en || '',
        slug: body.slug,
        excerpt_es: body.excerpt_es || '',
        excerpt_en: body.excerpt_en || '',
        content_es: body.content_es || '',
        content_en: body.content_en || '',
        featured_image: body.featured_image || '',
        tags: body.tags || [],
        published: body.published || false,
        published_at: body.published ? new Date().toISOString() : null,
        author_name: body.author_name || 'AltusPoint',
        meta_title_es: body.meta_title_es || '',
        meta_title_en: body.meta_title_en || '',
        meta_description_es: body.meta_description_es || '',
        meta_description_en: body.meta_description_en || '',
      })
      .select()
      .single();

    if (error) {
      console.error('Create blog post error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.error('Create blog post API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update a blog post
export async function PUT(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    // If publishing for the first time, set published_at
    if (updateData.published && !updateData.published_at) {
      // Check if it was already published
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (!existing?.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update blog post error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.error('Update blog post API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      console.error('Delete blog post error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete blog post API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
