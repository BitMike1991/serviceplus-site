import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET(request, { params }) {
  const { jobId } = await params;

  try {
    const result = await pool.query(`
      SELECT
        j.id as job_db_id,
        j.job_id,
        j.client_name,
        j.client_phone,
        j.client_email,
        j.client_address,
        j.project_type,
        j.project_description,
        j.quote_amount,
        j.deposit_amount,
        j.status,
        j.created_at,
        c.id as contract_id,
        c.signature_status,
        c.signed_at,
        c.signer_name
      FROM jobs j
      LEFT JOIN contracts c ON c.job_id = j.id
      WHERE j.job_id = $1 AND j.customer_id = 8
      LIMIT 1
    `, [jobId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Contrat non trouve' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Erreur base de donnees' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { jobId } = await params;
  const body = await request.json();
  const { signer_name, accepted } = body;

  if (!accepted || !signer_name) {
    return NextResponse.json({ error: 'Veuillez accepter les termes et entrer votre nom' }, { status: 400 });
  }

  try {
    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Call n8n webhook to process signature
    const webhookResponse = await fetch('https://automation.bluewiseai.com/webhook/sp-signature-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        job_id: jobId,
        event: 'signature_complete',
        signer_name: signer_name,
        signer_email: null,
        signed_at: new Date().toISOString(),
        ip_address: ip,
        user_agent: userAgent
      })
    });

    const webhookResult = await webhookResponse.json();

    if (webhookResult.status === 'ok') {
      return NextResponse.json({
        success: true,
        message: 'Contrat signe avec succes',
        job_id: jobId
      });
    } else {
      return NextResponse.json({
        error: webhookResult.message || 'Erreur lors de la signature'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Signature error:', error);
    return NextResponse.json({ error: 'Erreur lors de la signature' }, { status: 500 });
  }
}
