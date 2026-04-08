import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// Sanitize a string to be safe as a Supabase storage key (ASCII only)
function sanitizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (ñ→n, á→a, etc.)
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');         // Trim leading/trailing hyphens
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productSlug = formData.get('productSlug') as string;

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp'];
    if (!allowedExts.includes(fileExt)) {
      return NextResponse.json({ error: 'Only JPG, PNG and WebP images are allowed' }, { status: 400 });
    }

    const safeSlug = sanitizeKey(productSlug || 'product');
    const fileName = `${safeSlug}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed: ' + uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('product-images').getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload image API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove an image from storage
export async function DELETE(request: Request) {
  try {
    const auth = await requireAdmin();
    if ('error' in auth) return auth.error;
    const { supabase } = auth;
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // Extract filename from the full URL
    // URL format: https://xxx.supabase.co/storage/v1/object/public/product-images/filename.ext
    const parts = url.split('/product-images/');
    if (parts.length < 2) {
      // It's a local image (e.g., /images/products/xxx.png), can't delete from storage
      return NextResponse.json({ success: true });
    }

    const fileName = parts[1];
    const { error } = await supabase.storage.from('product-images').remove([fileName]);

    if (error) {
      console.error('Delete image error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete image API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
