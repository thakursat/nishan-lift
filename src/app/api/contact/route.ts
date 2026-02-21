import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Log or forward the payload to your backend/CRM in a real project.
    console.info('Contact submission received:', payload);

    return NextResponse.json({ message: 'Request received' }, { status: 200 });
  } catch (error) {
    console.error('Contact submission error', error);
    return NextResponse.json(
      { error: 'Unable to process request at this time.' },
      { status: 400 }
    );
  }
}
