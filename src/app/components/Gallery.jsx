"use client";

import { useMemo, useState } from "react";

export default function Gallery() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "0000000000";

  /**
   * ✅ IMPORTANT: Ces chemins doivent matcher EXACTEMENT ton /public
   * D'après ton zip:
   * - /public/gallery/projet1/avant3.1.jpg + apres3.1.jpg...
   * - /public/gallery/project3/avant6.jpg + apres6.jpg...
   * - /public/gallery/Extra/extra1.jpg...
   * - /public/gallery/project2/*.jpg (pas de avant/apres -> split 3/3 par défaut)
   */

  const heroProjects = useMemo(
    () => [
      {
        id: "projet1",
        title: "Armoires — transformation réelle",
        location: "Lanaudière",
        tag: "Sans démolition",
        before: [
          "/gallery/projet1/avant3.1.jpg",
          "/gallery/projet1/avant3.2.jpg",
          "/gallery/projet1/avant3.3.jpg",
        ].filter(Boolean),
        after: [
          "/gallery/projet1/apres3.jpg",
          "/gallery/projet1/apres3.1.jpg",
          "/gallery/projet1/apres3.2.jpg",
          "/gallery/projet1/apres3.3.jpg",
        ].filter(Boolean),
      },
      {
        id: "project2",
        title: "Salle de bain — finition epoxy premium",
        location: "Lanaudière",
        tag: "Garantie 25 ans",
        // ⚠️ Tes fichiers project2 n'ont pas "avant/apres".
        // Je fais un split 3/3 par défaut.
        // Ajuste l’ordre ici si tu veux (déplace les images).
        before: [
            "/gallery/project2/616092332_1544600156801506_5249019852355096672_n.jpg",
            "/gallery/project2/617079560_1949334242670872_2804692633829754882_n.jpg",
        ],
        after: [
            "/gallery/project2/601044257_1969604957244474_3440489958345249208_n.jpg",
            "/gallery/project2/612142531_33675497038732839_8662357694532606220_n.jpg",
            "/gallery/project2/614887958_1575830456954573_1643053157899217044_n.jpg",
        ],
      },
      {
        id: "project3",
        title: "Revêtement extérieur",
        location: "Régions adjacentes",
        tag: "Économie vs remplacement",
        before: [
          "/gallery/project3/avant6.jpg",
          "/gallery/project3/avant6.1.jpg",
          "/gallery/project3/avant6.3.jpg",
        ],
        after: [
          "/gallery/project3/apres6.jpg",
          "/gallery/project3/apres6.1.jpg",
          "/gallery/project3/apres6.3.jpg",
        ],
      },
    ],
    []
  );

  const extraGallery = useMemo(
    () => [
      "/gallery/Extra/extra1.jpg",
      "/gallery/Extra/extra2.jpg",
      "/gallery/Extra/extra3.jpg",
      "/gallery/Extra/extra4.jpg",
      "/gallery/Extra/extra5.jpg",
      "/gallery/Extra/extra6.jpg",
      "/gallery/Extra/extra7.jpg",
      "/gallery/Extra/extra8.jpg",
      "/gallery/Extra/extra9.jpg",
      "/gallery/Extra/extra10.jpg",
      "/gallery/Extra/extra11.jpg",
      "/gallery/Extra/extra12.jpg",
    ],
    []
  );

  function clampIndex(i, n) {
    if (n <= 0) return 0;
    return ((i % n) + n) % n;
  }

  function ProjectGallery({ project }) {
    const [tab, setTab] = useState("after"); // after en premier = meilleur pour conversion
    const images = tab === "before" ? project.before : project.after;

    const [index, setIndex] = useState(0);

    // reset index si on change d’onglet et que l’index dépasse
    const safeIndex = clampIndex(index, images.length || 1);

    const goPrev = () => setIndex((i) => clampIndex(i - 1, images.length));
    const goNext = () => setIndex((i) => clampIndex(i + 1, images.length));

    const hasImages = images && images.length > 0;
    const currentSrc = hasImages ? images[safeIndex] : null;

    return (
      <div className="mt-6">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="inline-flex rounded-xl border border-gray-800 bg-black/30 p-1 w-fit">
            <button
              type="button"
              onClick={() => {
                setTab("before");
                setIndex(0);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "before"
                  ? "bg-gray-200 text-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              AVANT
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("after");
                setIndex(0);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === "after"
                  ? "bg-accent text-dark"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              APRÈS (RÉSULTAT)
            </button>
          </div>

          <div className="text-xs text-gray-500">
            {hasImages ? (
              <>
                {safeIndex + 1} / {images.length}
              </>
            ) : (
              "Aucune image dans cet onglet"
            )}
          </div>
        </div>

        {/* Main viewer */}
        <div className="mt-4 relative rounded-2xl border border-gray-800 bg-black overflow-hidden">
          <div className="relative h-[340px] md:h-[420px] lg:h-[460px] w-full">
            {currentSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentSrc}
                alt={`${project.title} - ${tab}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Ajoutez des images dans {tab === "before" ? "before" : "after"}.
              </div>
            )}

            {/* overlay labels */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full bg-dark/80 border border-gray-700 px-3 py-1 text-xs font-bold tracking-wide text-gray-200">
                {tab === "before" ? "AVANT" : "APRÈS (RÉSULTAT)"}
              </span>
            </div>

            {/* arrows */}
            <button
              type="button"
              onClick={goPrev}
              className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-700 bg-black/60 text-white hover:border-accent hover:bg-black/80 transition-colors"
              aria-label="Image précédente"
              disabled={!hasImages || images.length <= 1}
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-gray-700 bg-black/60 text-white hover:border-accent hover:bg-black/80 transition-colors"
              aria-label="Image suivante"
              disabled={!hasImages || images.length <= 1}
            >
              →
            </button>

            {/* open */}
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
        {hasImages && images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => {
              const active = i === safeIndex;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border transition-colors ${
                    active ? "border-accent" : "border-gray-800 hover:border-gray-600"
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
                  {active && (
                    <div className="absolute inset-0 ring-2 ring-accent/60" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <p className="mt-3 text-xs text-gray-500">
          Photos prises sur chantiers réels. Les angles peuvent varier selon les espaces — c’est normal.
        </p>
      </div>
    );
  }

  function ProjectRow({ p }) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl">{p.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{p.location}</p>
            <p className="text-gray-400 text-sm mt-2">
              Finition epoxy professionnelle — processus propre, sans démolition.
            </p>
          </div>

          <span className="text-xs font-semibold rounded-full border border-gray-700 px-3 py-1 text-gray-300 w-fit">
            {p.tag}
          </span>
        </div>

        <ProjectGallery project={p} />
      </div>
    );
  }

  return (
    <section id="realisations" className="py-20 bg-dark text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-accent font-extrabold tracking-wide">PREUVES VISUELLES</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Transformations réelles (chantiers Service Plus)
            </h2>
            <p className="text-gray-400 mt-3 max-w-3xl">
              Photos prises sur chantiers réels. Les angles peuvent varier selon les espaces — c’est normal.
              L’important : le résultat final, sans démolition, avec une finition epoxy durable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors text-center"
            >
              Parler à notre agent
            </a>
            <a
              href="#contact"
              className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors text-center"
            >
              Estimation gratuite — 24h
            </a>
          </div>
        </div>

        {/* ✅ 3 gros projets, 1 par ligne */}
        <div className="mt-10 flex flex-col gap-10">
          {heroProjects.map((p) => (
            <ProjectRow key={p.id} p={p} />
          ))}
        </div>

        {/* Extra Gallery */}
        <div className="mt-12 bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-2 text-white">Autres réalisations</h3>
          <p className="text-gray-400 mb-6">
            Plus de preuves, plus de confiance. (Photos de chantiers réels.)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {extraGallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-800 bg-black/30"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Réalisation Service Plus"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-xs mt-4">
            Toutes les photos sont prises sur nos chantiers réels.
          </p>
        </div>
      </div>
    </section>
  );
}
