"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Combien ça coûte, refinir des armoires de cuisine ?",
    a: "Le prix dépend de la taille de la cuisine et du nombre d'armoires. En général, nos projets de refinition époxy commencent à partir de 3 500 $. C'est 5 à 10 fois moins cher qu'un remplacement complet (25 000 $ – 40 000 $). Demandez une estimation gratuite — on vous répond en 24h.",
  },
  {
    q: "Combien de temps durent les travaux ?",
    a: "La plupart des cuisines sont complétées en 3 à 5 jours ouvrables. Après la dernière couche, il faut prévoir 24 à 48 heures de séchage avant de pouvoir utiliser la cuisine normalement.",
  },
  {
    q: "Est-ce que je peux utiliser ma cuisine pendant les travaux ?",
    a: "Non — la cuisine sera inaccessible pendant les travaux et durant la période de séchage (24 à 48h après la dernière couche). On recommande de prévoir un petit coin temporaire pour les repas.",
  },
  {
    q: "La garantie de 25 ans, c'est sur quoi exactement ?",
    a: "La garantie de 25 ans couvre spécifiquement l'adhérence du revêtement époxy : décollement, délamination et défaut d'adhérence. Elle est offerte par écrit dans votre contrat. Les dommages causés par des impacts, la chaleur, des produits chimiques ou l'usure normale ne sont pas couverts.",
  },
  {
    q: "Est-ce que ça sent fort ? Est-ce dangereux ?",
    a: "Les produits utilisés sont à base d'eau et à faible odeur. Une ventilation adéquate est assurée pendant les travaux. Il n'y a pas de danger pour votre famille — on recommande simplement de ne pas rester dans la cuisine pendant l'application.",
  },
  {
    q: "Quelles couleurs sont disponibles ?",
    a: "Toutes les couleurs sont disponibles. On travaille avec des palettes professionnelles et on peut même faire des combinaisons de couleurs (intérieur/extérieur d'armoires différents). On vous montre des échantillons avant de commencer.",
  },
  {
    q: "Est-ce que je dois vider mes armoires avant ?",
    a: "Oui — toutes les armoires doivent être vidées avant le début des travaux. C'est la seule chose qu'on vous demande de faire. On s'occupe de tout le reste : protection des planchers, masquage des murs et plafond.",
  },
  {
    q: "Vous servez quelle région ?",
    a: "On est basés dans Lanaudière et on couvre toutes les régions adjacentes. Pour les projets plus importants, on se déplace jusqu'à 2-3 heures de route.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-white group-hover:text-accent transition-colors pr-4">
          {q}
        </span>
        <span className="text-accent text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="pb-5 text-gray-400 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  return (
    <section id="faq" className="py-20 bg-dark text-gray-200">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Questions fréquentes
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-gray-400">
          Tout ce que vous devez savoir avant de refinir vos armoires.
        </p>

        <div>
          {faqs.map(({ q, a }) => (
            <FAQItem key={q} q={q} a={a} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">Une autre question ?</p>
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors"
          >
            Appelez-nous — on répond 24/7
          </a>
        </div>
      </div>
    </section>
  );
}
