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
          ENTREPRENEUR GÉNÉRAL — FINITION PREMIUM
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Refaire votre cuisine <span className="text-accent">sans tout casser</span>.
        </h1>

        <p className="text-lg md:text-2xl mb-6 text-gray-300">
          Transformez vos armoires avec une finition epoxy haut de gamme, <span className="text-gray-200">sans démolition</span> — et surtout,
          <span className="text-gray-200"> sans exploser votre budget</span>.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8 text-sm">
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ Sans démolition</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">🛡️ Garantie 25 ans (époxy)</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ Fini haut de gamme</span>
          <span className="px-3 py-1 rounded-full bg-black/40 border border-gray-700">✅ Lanaudière + régions</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${PHONE}`}
            className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors"
          >
            Parler à notre agent
          </a>
          <a
            href="#contact"
            className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors"
          >
            Estimation gratuite — réponse en 24h
          </a>
        </div>

        <p className="mt-5 text-sm text-gray-400">
          “Je veux refaire ma cuisine sans tout casser — surtout pas mon portefeuille.”
        </p>
      </div>
    </section>
  );
}
