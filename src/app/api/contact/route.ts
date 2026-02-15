import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      await sendContactEmail({ name, email, message });
    } else {
      console.log('RESEND_API_KEY not set — contact form logged only:', { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
