'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MerciPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); min-height: 100vh; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .success-icon { width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; animation: pop 0.5s ease-out; }
        .success-icon svg { width: 40px; height: 40px; color: white; }
        @keyframes pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        h1 { color: #1f2937; font-size: 32px; margin-bottom: 15px; }
        .subtitle { color: #6b7280; font-size: 18px; margin-bottom: 30px; }
        .card { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .card h2 { color: #2563eb; font-size: 20px; margin-bottom: 20px; }
        .steps { text-align: left; }
        .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
        .step-number { background: #2563eb; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0; }
        .step-text { color: #4b5563; font-size: 15px; padding-top: 3px; }
        .contact-box { background: #f0fdf4; border: 1px solid #10b981; border-radius: 12px; padding: 20px; margin-top: 20px; }
        .contact-box p { color: #047857; margin-bottom: 10px; }
        .contact-box a { color: #2563eb; text-decoration: none; font-weight: 600; }
        .contact-box a:hover { text-decoration: underline; }
        .home-link { display: inline-block; background: #2563eb; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.2s; }
        .home-link:hover { background: #1d4ed8; }
        .confetti { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; z-index: 1000; }
        .confetti-piece { position: absolute; width: 10px; height: 10px; top: -10px; animation: fall 3s linear forwards; }
        @keyframes fall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
      `}</style>

      {showConfetti && (
        <div className="confetti">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        <div className="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1>Merci pour votre confiance!</h1>
        <p className="subtitle">Votre paiement a ete recu avec succes.</p>

        <div className="card">
          <h2>Prochaines etapes</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-text">Vous recevrez un courriel de confirmation dans les prochaines minutes.</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">Notre equipe vous contactera dans les 24-48h pour planifier les travaux.</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">Nous confirmerons la date et l'heure qui vous conviennent.</div>
            </div>
          </div>

          <div className="contact-box">
            <p><strong>Des questions?</strong></p>
            <p>Appelez-nous au <a href="tel:+14504998758">(450) 499-8758</a></p>
            <p>ou ecrivez-nous a <a href="mailto:info@serviceplus.plus">info@serviceplus.plus</a></p>
          </div>
        </div>

        <Link href="/" className="home-link">
          Retour a l'accueil
        </Link>
      </div>
    </>
  );
}
