import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENT = 'thakursatyam9415@gmail.com';

function buildHtml(data: Record<string, string>) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:10px 16px;font-weight:600;color:#555;font-size:13px;white-space:nowrap;vertical-align:top;width:160px;">${label}</td>
           <td style="padding:10px 16px;font-size:13px;color:#1a1a1a;border-left:1px solid #eee;">${value}</td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- header -->
        <tr>
          <td style="background:#9e0000;border-radius:12px 12px 0 0;padding:28px 32px;">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.6);">
              Nishan Lift Solutions
            </p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#fff;">
              New Lift Inquiry
            </h1>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">
              Submitted via the contact form on nishanliftsolutions.com
            </p>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="background:#ffffff;padding:8px 0;border:1px solid #e8e3dc;border-top:none;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', data.name)}
              ${row('Phone', data.phone)}
              ${row('Email', data.email)}
              ${row('Location', data.location)}
              ${row('Property Type', data.propertyType)}
              ${row('Number of Floors', data.floors)}
              ${row('Lift Requirement', data.liftRequirement)}
              ${row('Message', data.message ? data.message.replace(/\n/g, '<br>') : '')}
            </table>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="background:#faf9f7;border:1px solid #e8e3dc;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#999;">
              This email was generated automatically. Reply directly to the customer at
              <a href="mailto:${data.email}" style="color:#9e0000;">${data.email || '—'}</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, string>;

    // Log always (useful even if email fails)
    console.info('Contact submission:', data);

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.warn('Email credentials not configured — skipping email send.');
      return NextResponse.json(
        { message: 'Request received' },
        { status: 200 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"Nishan Lift Solutions" <${gmailUser}>`,
      to: RECIPIENT,
      replyTo: data.email || undefined,
      subject: `New Lift Inquiry — ${data.name || 'Unknown'} (${data.propertyType || 'General'})`,
      html: buildHtml(data),
    });

    return NextResponse.json({ message: 'Request received' }, { status: 200 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Unable to process request at this time.' },
      { status: 400 },
    );
  }
}
