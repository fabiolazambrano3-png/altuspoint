import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Log contact submission (in production, integrate with Resend/SendGrid/Supabase Edge Functions)
    console.log('📧 Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate with email service
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'AltusPoint <noreply@altuspoint.com>',
    //   to: 'info@altuspoint.com',
    //   subject: `Contacto web: ${name}`,
    //   html: `<p><strong>${name}</strong> (${email})</p><p>${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
