"use client";

import { useState } from "react";

export default function Contact() {
  // ✅ Hard-set for fast deploy (you can still override with env later)
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";
  const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "info@serviceplus.plus";

  // ✅ FAST inbound: use FormSubmit now, swap to n8n webhook later
  // Replace this with your real endpoint:
  // Example: https://formsubmit.co/YOUR_EMAIL
  const FORM_ENDPOINT =
    process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/${EMAIL}`;

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section id="contact" className="py-20 bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Parler à l’agent / Obtenir une estimation
        </h2>

        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-400">
          Le plus rapide : appelez et décrivez votre projet (24/7). Sinon,
          envoyez-nous les détails ici — idéalement avec des photos.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact information */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg">Téléphone (agent IA 24/7)</h3>
              <a href={`tel:${PHONE}`} className="text-accent text-2xl font-extrabold">
                {PHONE}
              </a>
              <p className="text-gray-400 text-sm mt-1">
                Cliquez pour appeler. On vous guide et on qualifie votre projet rapidement.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE}`}
                  className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors text-center"
                >
                  Appeler maintenant
                </a>
                <a
                  href="#formulaire"
                  className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors text-center"
                >
                  Remplir le formulaire
                </a>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg">Courriel</h3>
              <a href={`mailto:${EMAIL}`} className="text-accent break-all">
                {EMAIL}
              </a>
              <p className="text-gray-400 text-sm mt-1">
                Si vous préférez, vous pouvez aussi envoyer vos photos par courriel.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-lg">Territoire</h3>
              <p className="text-gray-300">Lanaudière + régions adjacentes</p>
              <p className="text-gray-400 text-sm">Déplacements possibles 2–3h selon le projet.</p>
            </div>

            <div className="bg-black/30 border border-gray-800 p-6 rounded-2xl">
              <h3 className="font-semibold text-lg text-white">Pour une estimation rapide</h3>
              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li>✅ 4–8 photos (vue d’ensemble + détails)</li>
                <li>✅ Ville + type de projet</li>
                <li>✅ Délais souhaités</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <form
            id="formulaire"
            action={FORM_ENDPOINT}
            method="POST"
            encType="multipart/form-data"
            onSubmit={() => setIsSubmitting(true)}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4"
          >
            {/* FormSubmit controls (safe + fast) */}
            <input type="hidden" name="_subject" value="Demande d’estimation — Service Plus (Site Web)" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            {/* After success: send them back to site with a thank you */}
            <input type="hidden" name="_next" value="/merci" />

            {/* BlueWise-ready fields */}
            <input type="hidden" name="source" value="serviceplus_site" />
            <input type="hidden" name="channel" value="web_form" />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="(xxx) xxx-xxxx"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Courriel
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Ex: Joliette"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium mb-1">
                Type de projet
              </label>
              <select
                id="project"
                name="project"
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="Armoires de cuisine (époxy)"
              >
                <option>Armoires de cuisine (époxy)</option>
                <option>Peinture extérieure</option>
                <option>Peinture intérieure</option>
                <option>Surfaces spéciales (bain, céramique, brique, etc.)</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Détails
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ex: nombre d'armoires, état, couleur souhaitée, délais, photos disponibles…"
                required
              />
            </div>

            <div>
              <label htmlFor="photos" className="block text-sm font-medium mb-1">
                Photos (recommandé)
              </label>
              <input
                id="photos"
                name="attachment"
                type="file"
                accept="image/*"
                multiple
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-dark file:font-semibold hover:file:bg-primary"
              />
              <p className="text-xs text-gray-400 mt-2">
                Ajoutez 4–8 photos : vue d’ensemble + détails (portes, coins, zones usées).
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-dark py-3 px-4 rounded-xl font-semibold hover:bg-primary transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Envoi en cours…" : "Envoyer la demande"}
            </button>

            <p className="text-xs text-gray-400">
              Réponse rapide. Si vous préférez : appelez le <span className="text-gray-200 font-semibold">{PHONE}</span>.
              <br />
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
