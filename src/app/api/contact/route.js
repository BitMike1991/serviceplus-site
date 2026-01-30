// Service Plus Contact API - Mailgun + Database Integration
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const mailgun = new Mailgun(FormData);
const mgClient = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net',
});

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Phone number normalization function
function normalizePhone(phone) {
  if (!phone) return null;
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Add +1 prefix if not present (North America)
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return `+${digits}`;
}

// Get last 7 digits of phone for quick lookup
function getPhoneLast7(normalizedPhone) {
  if (!normalizedPhone) return null;
  const digits = normalizedPhone.replace(/\D/g, '');
  return digits.slice(-7);
}

export async function POST(request) {
  const client = await pool.connect();

  try {
    const body = await request.json();
    const { name, phone, email, city, project, message, source, channel } = body;

    if (!name || !phone || !city || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs requis.' },
        { status: 400 }
      );
    }

    // Normalize phone number
    const normalizedPhone = normalizePhone(phone);
    const phoneLast7 = getPhoneLast7(normalizedPhone);
    const customerId = parseInt(process.env.SERVICE_PLUS_CUSTOMER_ID || '8');

    // Create lead in database
    const leadQuery = `
      INSERT INTO leads (
        customer_id,
        name,
        phone,
        normalized_phone,
        phone_last7,
        email,
        normalized_email,
        city,
        source,
        status,
        language,
        notes,
        hot_score
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (customer_id, phone)
      DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        normalized_email = EXCLUDED.normalized_email,
        city = EXCLUDED.city,
        notes = EXCLUDED.notes,
        updated_at = NOW()
      RETURNING id, name, phone;
    `;

    const leadNotes = `Type de projet: ${project || 'Non spécifié'}

Message:
${message}

Source: ${source || 'serviceplus_site'}
Canal: ${channel || 'web_form'}`;

    const leadResult = await client.query(leadQuery, [
      customerId,                           // customer_id
      name,                                 // name
      normalizedPhone,                      // phone (FIXED: use normalized)
      normalizedPhone,                      // normalized_phone
      phoneLast7,                           // phone_last7
      email || null,                        // email
      email ? email.toLowerCase() : null,   // normalized_email
      city,                                 // city
      source || 'serviceplus_site',         // source
      'new',                                // status
      'fr',                                 // language (Quebec)
      leadNotes,                            // notes
      5                                     // hot_score (new web form submission)
    ]);

    const leadId = leadResult.rows[0]?.id;
    console.log(`✅ Lead created/updated: ID ${leadId}, Name: ${name}, Phone: ${normalizedPhone}`);

    // Trigger n8n workflow for SMS notifications (fire-and-forget)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId,
            name,
            phone: normalizedPhone,
            email: email || null,
            city,
            project: project || 'Non spécifié',
            message,
            source: source || 'serviceplus_site'
          })
        }).catch(err => console.error('n8n webhook error (non-blocking):', err));
      } catch (webhookErr) {
        console.error('n8n webhook failed (non-blocking):', webhookErr);
      }
    }

    // Send internal notification email via Mailgun
    const domain = process.env.MAILGUN_DOMAIN;
    const toEmail = process.env.MAILGUN_TO || 'info@serviceplus.plus';

    const internalMail = {
      from: `Service Plus Contact <postmaster@${domain}>`,
      to: toEmail,
      subject: `🔥 Nouvelle demande - ${name} (${city})`,
      text: `Nouvelle demande d'estimation reçue via ${source || 'site web'}

Lead ID: ${leadId}

Nom: ${name}
Téléphone: ${phone}
Email: ${email || 'Non fourni'}
Ville: ${city}
Type de projet: ${project || 'Non spécifié'}

Message:
${message}

---
Source: ${source || 'serviceplus_site'}
Canal: ${channel || 'web_form'}

💡 Pour voir les photos, demandez au client de les envoyer par SMS au +1 (450) 499-8758`,
      'h:Reply-To': email || phone,
    };

    await mgClient.messages.create(domain, internalMail);

    // Send client confirmation email (if email provided)
    if (email) {
      const confirmationMail = {
        from: `Service Plus <hello@${domain}>`,
        to: email,
        subject: 'Demande reçue - Service Plus',
        text: `Bonjour ${name},

Merci d'avoir contacté Service Plus! Nous avons bien reçu votre demande pour un projet de ${project || 'rénovation'} à ${city}.

Nous communiquerons avec vous sous peu au ${phone} pour discuter de votre projet et planifier une estimation.

Si vous avez des photos de votre projet, vous pouvez nous les envoyer par SMS au:
📱 +1 (450) 499-8758

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

      <div style="background-color: #fef3c7; padding: 16px; border-left: 4px solid #f59e0b; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">📸 Avez-vous des photos?</p>
        <p style="margin: 8px 0 0 0;">Envoyez-les nous par SMS au <strong>+1 (450) 499-8758</strong></p>
      </div>

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

    return NextResponse.json({
      success: true,
      leadId: leadId,
      message: 'Demande reçue! Nous vous contacterons bientôt.'
    }, { status: 200 });

  } catch (error) {
    console.error('Contact API Error:', error);

    // Log detailed error for debugging
    if (error.code) {
      console.error('Database Error Code:', error.code);
      console.error('Database Error Detail:', error.detail);
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  } finally {
    client.release();
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
