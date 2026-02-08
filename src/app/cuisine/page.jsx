"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import {
  FaClipboardList,
  FaSprayCanSparkles,
  FaCircleCheck,
  FaShieldHalved,
} from "react-icons/fa6";
import Comparison from "../components/Comparison";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

/* ───── Simplified Nav (logo + CTA only) ───── */
function CuisineNav() {
  const [open, setOpen] = useState(false);
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark bg-opacity-90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <a href="/cuisine" className="flex items-center gap-3">
          <Image
            src="/serviceplus-logo.jpg"
            alt="Service Plus"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <div className="leading-tight">
            <div className="text-xl font-bold tracking-wide">
              Service <span className="text-accent">Plus</span>
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">
              Refinition époxy
            </div>
          </div>
        </a>

        {/* Desktop: just 2 links + CTA */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#realisations" className="text-sm uppercase font-medium hover:text-accent">
            Réalisations
          </a>
          <a href="#faq" className="text-sm uppercase font-medium hover:text-accent">
            FAQ
          </a>
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors"
          >
            Estimation gratuite
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-dark bg-opacity-95 p-6 space-y-4">
          <a href="#realisations" className="block text-lg font-semibold uppercase hover:text-accent" onClick={() => setOpen(false)}>
            Réalisations
          </a>
          <a href="#faq" className="block text-lg font-semibold uppercase hover:text-accent" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a href="#contact" className="block text-lg font-semibold uppercase hover:text-accent" onClick={() => setOpen(false)}>
            Contact
          </a>
          <a
            href={`tel:${PHONE}`}
            className="block bg-accent text-dark px-4 py-2 rounded-xl text-center font-semibold mt-4"
          >
            Appeler maintenant
          </a>
        </nav>
      )}
    </header>
  );
}

/* ───── Kitchen Hero ───── */
function KitchenHero() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/serviceplus-hero.jpg"
          alt="Refinition d'armoires de cuisine — Service Plus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark bg-opacity-75"></div>
      </div>

      <div className="max-w-4xl px-4 md:px-8">
        <p className="text-accent font-extrabold tracking-wide mb-3 text-sm md:text-base">
          VU SUR FACEBOOK — OFFRE REFINITION CUISINE
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Vos armoires comme neuves —{" "}
          <span className="text-accent">économisez plus de 20&nbsp;000&nbsp;$</span>
        </h1>

        <p className="text-lg md:text-2xl mb-6 text-gray-300">
          Refinition époxy professionnelle,{" "}
          <span className="text-gray-200">sans démolition</span>, en{" "}
          <span className="text-gray-200">3 à 5 jours</span>. Résultat garanti 25 ans.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8 text-sm">
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">
            🛡️ Garantie 25 ans
          </span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">
            ✅ Sans démolition
          </span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">
            ✅ 3 à 5 jours
          </span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">
            💰 À partir de 3 500 $
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors"
          >
            Appeler pour une estimation gratuite
          </a>
          <a
            href="#contact"
            className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors"
          >
            Demander une estimation en ligne
          </a>
        </div>

        <p className="mt-5 text-sm text-gray-400">
          Remplacement complet : 25 000 $ – 40 000 $&nbsp;&nbsp;|&nbsp;&nbsp;Service
          Plus : à partir de 3 500 $
        </p>
      </div>
    </section>
  );
}

/* ───── Kitchen Gallery (projet1 only) ───── */
function KitchenGallery() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  const beforeImages = [
    "/gallery/projet1/avant3.1.jpg",
    "/gallery/projet1/avant3.2.jpg",
    "/gallery/projet1/avant3.3.jpg",
  ];
  const afterImages = [
    "/gallery/projet1/apres3.jpg",
    "/gallery/projet1/apres3.1.jpg",
    "/gallery/projet1/apres3.2.jpg",
    "/gallery/projet1/apres3.3.jpg",
  ];

  // Extra kitchen photos from the Extra folder
  const extraKitchen = [
    "/gallery/Extra/extra1.jpg",
    "/gallery/Extra/extra2.jpg",
    "/gallery/Extra/extra3.jpg",
    "/gallery/Extra/extra4.jpg",
    "/gallery/Extra/extra5.jpg",
    "/gallery/Extra/extra6.jpg",
  ];

  const [tab, setTab] = useState("after");
  const images = tab === "before" ? beforeImages : afterImages;
  const [index, setIndex] = useState(0);

  const safeIndex = images.length > 0 ? ((index % images.length) + images.length) % images.length : 0;
  const currentSrc = images.length > 0 ? images[safeIndex] : null;

  const goPrev = () => setIndex((i) => ((i - 1) % images.length + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section id="realisations" className="py-20 bg-dark text-gray-200">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <p className="text-accent font-extrabold tracking-wide text-center">
          PREUVES VISUELLES
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-2 mb-3">
          Transformation réelle — armoires de cuisine
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-gray-400">
          Avant / après d'un projet réel. Finition époxy professionnelle, sans démolition.
        </p>

        {/* Before/After Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="inline-flex rounded-xl border border-gray-800 bg-black/30 p-1 w-fit">
            <button
              type="button"
              onClick={() => { setTab("before"); setIndex(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "before" ? "bg-gray-200 text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              AVANT
            </button>
            <button
              type="button"
              onClick={() => { setTab("after"); setIndex(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "after" ? "bg-accent text-dark" : "text-gray-300 hover:text-white"
              }`}
            >
              APRÈS (RÉSULTAT)
            </button>
          </div>
          <div className="text-xs text-gray-500">
            {safeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Main Image Viewer */}
        <div className="relative rounded-2xl border border-gray-800 bg-black overflow-hidden">
          <div className="relative h-[340px] md:h-[420px] lg:h-[460px] w-full">
            {currentSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentSrc}
                alt={`Armoires de cuisine — ${tab === "before" ? "avant" : "après"}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full bg-dark/80 border border-gray-700 px-3 py-1 text-xs font-bold tracking-wide text-gray-200">
                {tab === "before" ? "AVANT" : "APRÈS (RÉSULTAT)"}
              </span>
            </div>

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-700 bg-black/60 text-white hover:border-accent hover:bg-black/80 transition-colors"
                  aria-label="Image précédente"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-700 bg-black/60 text-white hover:border-accent hover:bg-black/80 transition-colors"
                  aria-label="Image suivante"
                >
                  →
                </button>
              </>
            )}

            {currentSrc && (
              <a
                href={currentSrc}
                target="_blank"
                rel="noreferrer"
                className="absolute right-3 bottom-3 inline-flex items-center rounded-full border border-gray-700 bg-black/60 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-accent"
              >
                Ouvrir ↗
              </a>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border transition-colors ${
                  i === safeIndex ? "border-accent" : "border-gray-800 hover:border-gray-600"
                }`}
                aria-label={`Voir image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="miniature"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {i === safeIndex && <div className="absolute inset-0 ring-2 ring-accent/60" />}
              </button>
            ))}
          </div>
        )}

        {/* Extra kitchen photos grid */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4 text-white">Autres réalisations cuisine</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {extraKitchen.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-800 bg-black/30"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Réalisation cuisine Service Plus"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA after gallery */}
        <div className="mt-8 text-center">
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors"
          >
            Votre cuisine pourrait ressembler à ça — appelez-nous
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───── Kitchen Process (3 steps inline) ───── */
function KitchenProcess() {
  const steps = [
    {
      icon: FaClipboardList,
      step: "1",
      title: "Diagnostic gratuit",
      description:
        "On évalue vos armoires, discute des couleurs et vous donne un prix fixe — pas de surprises. Estimation en 24h.",
    },
    {
      icon: FaSprayCanSparkles,
      step: "2",
      title: "Préparation & application",
      description:
        "Dégraissage, ponçage, masquage complet. Puis application contrôlée de l'époxy : 5 couches pour un fini haut de gamme.",
    },
    {
      icon: FaCircleCheck,
      step: "3",
      title: "Résultat garanti",
      description:
        "Inspection finale, conseils d'entretien, et garantie de 25 ans sur l'adhérence époxy. Votre cuisine, comme neuve.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-gray-200">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Comment ça fonctionne
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-400">
          Un processus simple, propre et rapide — vous retrouvez votre cuisine en 3 à 5 jours.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="bg-accent text-dark p-4 rounded-full mb-4 relative">
                <Icon className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-dark text-accent text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border border-accent">
                  {step}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Warranty Box ───── */
function WarrantyBox() {
  return (
    <section className="py-16 bg-dark text-gray-200">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-2xl p-8 md:p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-accent text-dark p-4 rounded-full">
              <FaShieldHalved className="text-3xl" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Garantie <span className="text-accent">25 ans</span> sur l'adhérence époxy
          </h2>

          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Notre garantie couvre spécifiquement le décollement, la délamination et tout défaut
            d'adhérence du revêtement époxy. Par écrit, dans votre contrat.
          </p>

          <div className="text-left max-w-md mx-auto bg-black/20 rounded-xl p-5 text-sm">
            <p className="font-semibold text-white mb-2">Ce qui est couvert :</p>
            <ul className="space-y-1 text-gray-300">
              <li>✅ Décollement du revêtement</li>
              <li>✅ Délamination</li>
              <li>✅ Défaut d'adhérence</li>
            </ul>
            <p className="font-semibold text-white mt-4 mb-2">Exclusions normales :</p>
            <ul className="space-y-1 text-gray-400">
              <li>• Impacts et chocs</li>
              <li>• Chaleur directe excessive</li>
              <li>• Produits chimiques abrasifs</li>
              <li>• Usure normale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── February Promo Banner ───── */
function FebruaryPromo() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  return (
    <section className="py-10 bg-gradient-to-r from-red-900/40 via-red-800/30 to-red-900/40 border-y border-red-700/40">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <p className="text-red-400 font-extrabold tracking-wide text-sm mb-2 uppercase">
          Offre spéciale — Février seulement
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
          Cuisine de base à{" "}
          <span className="line-through text-gray-500 text-xl sm:text-2xl md:text-3xl">5 000 $</span>{" "}
          <span className="text-accent">3 000 $</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-5">
          + <span className="text-accent font-bold">1 pièce repeinturée en bonus</span>{" "}
          <span className="text-gray-400">(valeur de 800 $)</span>
        </p>

        <div className="inline-flex flex-col sm:flex-row gap-3 mb-4">
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-8 rounded-xl font-extrabold hover:bg-primary transition-colors text-center"
          >
            Réserver cette offre
          </a>
          <a
            href="#contact"
            className="border border-accent text-accent py-3 px-8 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors text-center"
          >
            Demander les détails
          </a>
        </div>

        <p className="text-xs text-gray-500">
          Offre valide pour les projets réservés en février 2026. Cuisine de base standard. Détails sur demande.
        </p>
      </div>
    </section>
  );
}

/* ───── Main Page ───── */
export default function CuisinePage() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "+14504998758";

  return (
    <>
      <CuisineNav />
      <main>
        <KitchenHero />
        <FebruaryPromo />
        <Comparison />
        <KitchenGallery />
        <KitchenProcess />
        <WarrantyBox />
        <FAQ />
        <Contact source="cuisine_landing" defaultProject="Armoires de cuisine (époxy)" />
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark/95 border-t border-gray-800 p-3">
        <div className="max-w-7xl mx-auto flex gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex-1 bg-accent text-dark py-3 px-4 rounded-xl font-extrabold text-center"
          >
            Appeler maintenant
          </a>
          <a
            href="#contact"
            className="flex-1 border border-accent text-accent py-3 px-4 rounded-xl font-semibold text-center"
          >
            Estimation gratuite
          </a>
        </div>
      </div>

      <footer className="py-8 bg-dark text-gray-400 text-center text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Service Plus. Tous droits réservés.
      </footer>
    </>
  );
}
