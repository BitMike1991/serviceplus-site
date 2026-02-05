'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function generateContractHtml(data) {
  const quoteAmt = parseFloat(data.quote_amount) || 0;
  const depositAmt = parseFloat(data.deposit_amount) || 0;
  const midPayment = Math.round(quoteAmt * 0.50 * 100) / 100;
  const finalPayment = Math.round(quoteAmt * 0.25 * 100) / 100;

  const createdDate = new Date(data.created_at);
  const dateStr = createdDate.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });

  const address = data.client_address || {};
  const clientFullAddress = [address.street, address.city, address.postal_code].filter(Boolean).join(', ') || 'A confirmer';

  return `
    <div class="contract-header">
      <h1>SERVICE PLUS</h1>
      <div class="subtitle">Contrat de Service et Conditions Generales</div>
    </div>

    <div class="contract-info">
      <p><strong>Contrat No:</strong> ${data.job_id}</p>
      <p><strong>Date d'emission:</strong> ${dateStr}</p>
      <p><strong>Valide pour:</strong> 30 jours</p>
    </div>

    <div class="section">
      <div class="two-columns">
        <div class="info-box">
          <h3>Entrepreneur</h3>
          <p><strong>Service Plus</strong></p>
          <p>780 Av. Andre-Leclerc</p>
          <p>Saint-Come, QC J0K 2B0</p>
          <p>Canada</p>
          <p>Tel: (450) 499-8758</p>
          <p>info@serviceplus.plus</p>
        </div>
        <div class="info-box">
          <h3>Client</h3>
          <p><strong>${data.client_name}</strong></p>
          <p>${clientFullAddress}</p>
          <p>Tel: ${data.client_phone || 'A confirmer'}</p>
          <p>Email: ${data.client_email || 'A confirmer'}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Description des Travaux</h2>
      <div class="info-box">
        <p><strong>Type de projet:</strong> ${data.project_type || 'A confirmer'}</p>
        <p><strong>Description:</strong></p>
        <p>${data.project_description || 'Selon discussion avec le client. Les details specifiques seront confirmes avant le debut des travaux.'}</p>
      </div>
    </div>

    <div class="section">
      <h2>Conditions Financieres</h2>
      <table class="payment-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Echeance</th>
            <th class="amount">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Depot initial (25%)</td>
            <td>A la signature du contrat</td>
            <td class="amount">${depositAmt.toFixed(2)} $ CAD</td>
          </tr>
          <tr>
            <td>Paiement intermediaire (50%)</td>
            <td>Lorsque 75% des travaux sont completes</td>
            <td class="amount">${midPayment.toFixed(2)} $ CAD</td>
          </tr>
          <tr>
            <td>Solde final (25%)</td>
            <td>A la fin des travaux</td>
            <td class="amount">${finalPayment.toFixed(2)} $ CAD</td>
          </tr>
          <tr class="total-row">
            <td colspan="2">TOTAL</td>
            <td class="amount">${quoteAmt.toFixed(2)} $ CAD</td>
          </tr>
        </tbody>
      </table>
      <p class="note">* Taxes applicables incluses. Paiement accepte par virement Interac, carte de credit ou cheque.</p>
    </div>

    <div class="section">
      <h2>Garantie</h2>
      <div class="warranty-box">
        <h3>Garantie de 25 ans sur la peinture epoxy</h3>
        <p>Service Plus garantit la peinture epoxy contre tout defaut de materiau ou de main-d'oeuvre pour une periode de vingt-cinq (25) ans a compter de la date de fin des travaux.</p>
        <p><strong>Cette garantie couvre:</strong> Le decollement, l'ecaillage ou la degradation prematuree de la peinture epoxy dans des conditions d'utilisation normales.</p>
        <p><strong>Cette garantie ne couvre pas:</strong> Les dommages causes par une mauvaise utilisation, des produits chimiques non recommandes, des impacts physiques, ou le non-respect des instructions d'entretien.</p>
      </div>
    </div>

    <div class="section terms">
      <h2>Termes et Conditions</h2>

      <h3>1. Acceptation et Depot</h3>
      <p>Ce contrat entre en vigueur lors du paiement du depot initial de 25%. <strong>Le paiement du depot constitue une acceptation formelle et inconditionnelle de l'ensemble des termes et conditions du present contrat.</strong> Le depot est non remboursable si le client annule apres que les materiaux ont ete commandes ou que les travaux ont debute.</p>

      <h3>2. Calendrier des Travaux</h3>
      <p>La date de debut des travaux sera confirmee par Service Plus dans les 5 jours ouvrables suivant la reception du depot. Les delais peuvent varier selon la disponibilite des materiaux et les conditions meteorologiques.</p>

      <h3>3. Acces au Site</h3>
      <p>Le client s'engage a fournir un acces adequat au site de travail et a s'assurer que la zone est debarrassee de tout objet personnel avant le debut des travaux. Tout delai cause par un acces inadequat pourra entrainer des frais supplementaires.</p>

      <h3>4. Modifications et Travaux Supplementaires</h3>
      <p>Toute modification ou travail supplementaire demande par le client apres la signature du contrat fera l'objet d'un avenant ecrit et pourra entrainer des couts additionnels. Aucun travail supplementaire ne sera effectue sans accord prealable.</p>

      <h3>5. Annulation par le Client</h3>
      <ul>
        <li>Annulation avant commande des materiaux: Remboursement du depot moins 10% de frais administratifs.</li>
        <li>Annulation apres commande des materiaux: Depot non remboursable.</li>
        <li>Annulation apres debut des travaux: Le client est responsable du paiement des travaux completes et des materiaux utilises.</li>
      </ul>

      <h3>6. Responsabilites du Client</h3>
      <ul>
        <li>Obtenir tous les permis necessaires aupres des autorites competentes.</li>
        <li>Informer Service Plus de toute condition particuliere du site.</li>
        <li>Assurer l'acces a l'electricite et a l'eau si necessaire.</li>
        <li>Proteger les zones adjacentes aux travaux si desire.</li>
      </ul>

      <h3>7. Limitation de Responsabilite</h3>
      <p>La responsabilite de Service Plus est limitee au montant total du contrat. Service Plus ne pourra etre tenu responsable des dommages indirects, consecutifs ou accessoires.</p>

      <h3>8. Force Majeure</h3>
      <p>Service Plus ne pourra etre tenu responsable des retards ou de l'impossibilite d'executer les travaux en raison de circonstances hors de son controle, incluant mais non limite a: conditions meteorologiques extremes, pandemies, greves, retards de fournisseurs, ou actes gouvernementaux.</p>

      <h3>9. Resolution des Litiges</h3>
      <p>En cas de differend, les parties s'engagent a tenter de resoudre le conflit a l'amiable. Si aucune entente n'est possible, le litige sera soumis aux tribunaux competents du Quebec. Ce contrat est regi par les lois de la province de Quebec, Canada.</p>

      <h3>10. Integralite de l'Accord</h3>
      <p>Ce contrat constitue l'entente complete entre les parties et remplace toute discussion, negociation ou accord anterieur. Toute modification doit etre faite par ecrit et signee par les deux parties.</p>
    </div>
  `;
}

export default function ContratPage() {
  const params = useParams();
  const jobId = params.jobId;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signerName, setSignerName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function fetchContract() {
      try {
        const res = await fetch(`/api/contrat/${jobId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Erreur');
        setData(json);
        if (json.signature_status === 'signed') {
          setSigned(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContract();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted || !signerName.trim()) {
      alert('Veuillez accepter les termes et entrer votre nom complet.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/contrat/${jobId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signer_name: signerName.trim(), accepted })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur');
      setSigned(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du contrat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Erreur</h1>
        <p>{error}</p>
        <p>Veuillez contacter Service Plus au (450) 499-8758</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; color: #1f2937; line-height: 1.6; }
        .loading-container, .error-container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 20px; }
        .spinner { width: 40px; height: 40px; border: 4px solid #e5e7eb; border-top-color: #2563eb; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .error-container h1 { color: #dc2626; margin-bottom: 10px; }
        .container { max-width: 800px; margin: 0 auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .contract-header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; }
        .contract-header h1 { font-size: 32px; margin-bottom: 5px; }
        .contract-header .subtitle { opacity: 0.9; font-size: 16px; }
        .contract-info { background: #f8fafc; padding: 15px 20px; border-left: 4px solid #2563eb; margin: 20px; }
        .contract-info p { margin: 5px 0; font-size: 14px; }
        .section { padding: 0 20px; margin-bottom: 25px; }
        .section h2 { color: #2563eb; font-size: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
        .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) { .two-columns { grid-template-columns: 1fr; } }
        .info-box { background: #f9fafb; padding: 15px; border-radius: 8px; }
        .info-box h3 { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 10px; }
        .info-box p { margin: 5px 0; font-size: 14px; }
        .payment-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; }
        .payment-table th, .payment-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .payment-table th { background: #f9fafb; font-weight: 600; }
        .payment-table .amount { text-align: right; font-weight: 600; }
        .payment-table .total-row { background: #2563eb; color: white; }
        .payment-table .total-row td { font-weight: 700; }
        .note { font-size: 12px; color: #6b7280; margin-top: 10px; }
        .warranty-box { background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 8px; }
        .warranty-box h3 { color: #047857; margin-bottom: 10px; font-size: 16px; }
        .warranty-box p { font-size: 14px; margin-bottom: 8px; }
        .terms h3 { font-size: 14px; color: #1f2937; margin: 20px 0 10px 0; }
        .terms p, .terms li { font-size: 13px; color: #4b5563; margin-bottom: 8px; }
        .terms ul { padding-left: 20px; }
        .signature-section { background: #fffbeb; border-top: 3px solid #f59e0b; padding: 30px 20px; margin-top: 30px; }
        .signature-section h2 { color: #92400e; margin-bottom: 20px; }
        .signed-notice { background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; text-align: center; }
        .signed-notice h3 { color: #047857; margin-bottom: 10px; }
        .signature-form { max-width: 400px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px; }
        .form-group input[type="text"] { width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; }
        .form-group input[type="text"]:focus { outline: none; border-color: #2563eb; }
        .checkbox-group { display: flex; align-items: flex-start; gap: 12px; }
        .checkbox-group input[type="checkbox"] { width: 20px; height: 20px; margin-top: 3px; cursor: pointer; }
        .checkbox-group label { font-size: 14px; cursor: pointer; }
        .submit-btn { background: #2563eb; color: white; border: none; padding: 15px 40px; font-size: 16px; font-weight: 600; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .submit-btn:hover { background: #1d4ed8; }
        .submit-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
      `}</style>

      <div className="container">
        {data && (
          <>
            <div dangerouslySetInnerHTML={{ __html: generateContractHtml(data) }} />

            <div className="signature-section">
              <h2>Acceptation du Contrat</h2>

              {signed ? (
                <div className="signed-notice">
                  <h3>Contrat signe!</h3>
                  <p>Ce contrat a ete signe par <strong>{data.signer_name || signerName}</strong></p>
                  {data.signed_at && <p>Date: {new Date(data.signed_at).toLocaleString('fr-CA')}</p>}
                  <p style={{ marginTop: '20px', color: '#6b7280' }}>
                    Vous pouvez maintenant proceder au paiement du depot pour confirmer votre reservation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="signature-form">
                  <div className="form-group">
                    <label>Votre nom complet (signature electronique)</label>
                    <input
                      type="text"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      placeholder="Entrez votre nom complet"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="accept"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        required
                      />
                      <label htmlFor="accept">
                        J'ai lu et j'accepte l'ensemble des termes et conditions de ce contrat.
                        Je comprends que le paiement du depot constitue egalement une acceptation de ce contrat.
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? 'Signature en cours...' : 'Signer le contrat'}
                  </button>
                </form>
              )}
            </div>

            <div className="footer">
              <p>Service Plus | 780 Av. Andre-Leclerc, Saint-Come, QC J0K 2B0 | (450) 499-8758 | info@serviceplus.plus</p>
              <p>Contrat {data.job_id} - Genere electroniquement</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
