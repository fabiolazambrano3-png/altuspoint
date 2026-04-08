import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

// Sanitize a string to be safe as a Supabase storage key (ASCII only)
function sanitizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'pdf';
    if (fileExt !== 'pdf') {
      return NextResponse.json({ error: 'Solo se permiten archivos PDF' }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'El archivo no puede superar 20MB' }, { status: 400 });
    }

    const safeSlug = sanitizeKey(productSlug || 'product');
    const fileName = `${safeSlug}-brochure-${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('product-brochures')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/pdf',
      });

    if (uploadError) {
      console.error('Brochure upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed: ' + uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('product-brochures').getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload brochure API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove a brochure from storage
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

    const parts = url.split('/product-brochures/');
    if (parts.length < 2) {
      return NextResponse.json({ success: true });
    }

    const fileName = parts[1];
    const { error } = await supabase.storage.from('product-brochures').remove([fileName]);

    if (error) {
      console.error('Delete brochure error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete brochure API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
