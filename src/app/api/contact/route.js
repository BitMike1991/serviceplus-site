// Service Plus Contact API - Mailgun Integration
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { NextResponse } from 'next/server';

const mailgun = new Mailgun(FormData);
const mgClient = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net',
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, project, message, source, channel } = body;

    if (!name || !phone || !city || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs requis.' },
        { status: 400 }
      );
    }

    const domain = process.env.MAILGUN_DOMAIN;
    const toEmail = process.env.MAILGUN_TO || 'info@serviceplus.plus';

    // Internal notification email
    const internalMail = {
      from: `Service Plus Contact <postmaster@${domain}>`,
      to: toEmail,
      subject: `Nouvelle demande - ${name} (${city})`,
      text: `Nouvelle demande d'estimation reçue via ${source || 'site web'}

Nom: ${name}
Téléphone: ${phone}
Email: ${email || 'Non fourni'}
Ville: ${city}
Type de projet: ${project || 'Non spécifié'}

Message:
${message}

---
Source: ${source || 'serviceplus_site'}
Canal: ${channel || 'web_form'}`,
      'h:Reply-To': email || phone,
    };

    await mgClient.messages.create(domain, internalMail);

    // Client confirmation email (if email provided)
    if (email) {
      const confirmationMail = {
        from: `Service Plus <hello@${domain}>`,
        to: email,
        subject: 'Demande reçue - Service Plus',
        text: `Bonjour ${name},

Merci d'avoir contacté Service Plus! Nous avons bien reçu votre demande pour un projet de ${project || 'rénovation'} à ${city}.

Nous communiquerons avec vous sous peu au ${phone} pour discuter de votre projet et planifier une estimation.

Votre message:
"${message}"

À bientôt,
L'équipe Service Plus

---
Service Plus - Époxy & Peinture Spécialisée
Lanaudière + régions adjacentes
+1 (450) 499-8758`,
        html: `
<html>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #f59e0b;">Service Plus</h2>

      <p>Bonjour ${name},</p>

      <p>
        Merci d'avoir contacté <strong>Service Plus</strong>! Nous avons bien reçu votre demande pour un projet de <strong>${project || 'rénovation'}</strong> à <strong>${city}</strong>.
      </p>

      <p>
        Nous communiquerons avec vous sous peu au <strong>${phone}</strong> pour discuter de votre projet et planifier une estimation.
      </p>

      <blockquote style="background-color: #f9f9f9; padding: 12px 16px; border-left: 4px solid #f59e0b; margin: 20px 0;">
        "${message}"
      </blockquote>

      <p>À bientôt,<br />L'équipe Service Plus</p>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0;" />

      <p style="font-size: 0.85em; color: #666;">
        <strong>Service Plus - Époxy & Peinture Spécialisée</strong><br />
        Lanaudière + régions adjacentes<br />
        +1 (450) 499-8758<br />
        <a href="https://serviceplus.plus" style="color: #f59e0b;">serviceplus.plus</a>
      </p>
    </div>
  </body>
</html>`,
      };

      await mgClient.messages.create(domain, confirmationMail);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Mailgun Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS(request) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
