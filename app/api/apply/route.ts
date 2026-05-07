import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const loanTypeLabel = data.loanType === 'business' ? 'Erhvervslån' : 'Privatlån';
    const companyInfo = data.loanType === 'business' 
      ? `CVR: ${data.cvr}\nVirksomhed: ${data.companyName}`
      : `CPR: ${data.cpr}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22C55E 0%, #16a34a 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Ny låneansøgning</h1>
          <p style="color: #dcfce7; margin: 10px 0 0;">Mylånbank</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 20px; border-bottom: 2px solid #22C55E; padding-bottom: 10px;">
            Ansøgningsdetaljer
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Lånetype</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold; text-align: right;">${loanTypeLabel}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Ønsket beløb</td>
              <td style="padding: 12px 0; color: #22C55E; font-weight: bold; font-size: 18px; text-align: right;">${data.amount} DKK</td>
            </tr>
            <tr>
              <td colspan="2" style="border-bottom: 1px solid #e5e7eb;"></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Navn</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold; text-align: right;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; color: #1f2937; text-align: right;"><a href="mailto:${data.email}" style="color: #22C55E;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Telefon</td>
              <td style="padding: 12px 0; color: #1f2937; text-align: right;"><a href="tel:${data.phone}" style="color: #1f2937;">${data.phone}</a></td>
            </tr>
            <tr>
              <td colspan="2" style="border-bottom: 1px solid #e5e7eb;"></td>
            </tr>
            ${data.loanType === 'business' ? `
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">CVR-nummer</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold; text-align: right;">${data.cvr}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Virksomhed</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold; text-align: right;">${data.companyName}</td>
            </tr>
            ` : `
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">CPR-nummer</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold; text-align: right;">${data.cpr}</td>
            </tr>
            `}
          </table>
          
          <div style="margin-top: 25px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #22C55E;">
            <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; margin: 0 0 8px;">Formål med lånet</p>
            <p style="color: #1f2937; margin: 0; line-height: 1.6;">${data.purpose}</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${data.email}" style="background: #22C55E; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Svar på ansøgning
            </a>
          </div>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          Denne email er sendt via Mylånbank website
        </p>
      </div>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Mylånbank <onboarding@resend.dev>',
      to: ['Lånpenge47@gmail.com'],
      subject: `Ny låneansøgning (${loanTypeLabel}) fra ${data.firstName} ${data.lastName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('--- EMAIL SENDT ---');
    console.log('Til: Lånpenge47@gmail.com');
    console.log('Email ID:', emailData?.id);
    console.log('-------------------');

    return NextResponse.json({ success: true, emailId: emailData?.id });
  } catch (error) {
    console.error('Fejl ved afsendelse:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
