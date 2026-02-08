import Image from 'next/image';

export default function Hero() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || '0000000000';

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/serviceplus-hero.jpg"
          alt="Service Plus — finition epoxy haut de gamme"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
      </div>

      <div className="max-w-5xl px-4 md:px-8">
        <p className="text-accent font-extrabold tracking-wide mb-3">
          SPÉCIALISTE EN REFINITION — ÉPOXY HAUT DE GAMME
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Une cuisine comme neuve — <span className="text-accent">économisez plus de 20&nbsp;000&nbsp;$</span>
        </h1>

        <p className="text-lg md:text-2xl mb-6 text-gray-300">
          Refinition époxy professionnelle de vos armoires, <span className="text-gray-200">sans démolition</span>,
          à une <span className="text-gray-200">fraction du coût d'un remplacement complet</span>.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8 text-sm">
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">🛡️ Garantie 25 ans</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ Sans démolition</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ 3 à 5 jours</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ Lanaudière + régions</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors"
          >
            Estimation gratuite — 24h
          </a>
          <a
            href="#contact"
            className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors"
          >
            Voir nos réalisations
          </a>
        </div>

        <p className="mt-5 text-sm text-gray-400">
          Remplacement complet : 25 000 $ – 40 000 $&nbsp;&nbsp;|&nbsp;&nbsp;Service Plus : à partir de 3 500 $
        </p>
      </div>
    </section>
  );
}
