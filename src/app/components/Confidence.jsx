import {
  FaShieldHalved,
  FaScrewdriverWrench,
  FaMedal,
  FaStar,
  FaMapLocationDot,
} from "react-icons/fa6";

export default function Confidence() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || "0000000000";

  return (
    <section id="confiance" className="py-20 bg-dark text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Pourquoi nous faire confiance&nbsp;?
        </h2>

        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-400">
          Service Plus mise sur une chose : un résultat premium qui dure. On
          privilégie la préparation, la propreté du chantier et la qualité
          d’exécution.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-center text-center">
            <FaShieldHalved className="text-accent text-4xl mb-2" />
            <h3 className="font-semibold">Garantie écrite de 25 ans</h3>
            <p className="text-gray-400 text-sm">
              Sur la peinture epoxy (armoires et surfaces admissibles)
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <FaScrewdriverWrench className="text-accent text-4xl mb-2" />
            <h3 className="font-semibold">Sans démolition</h3>
            <p className="text-gray-400 text-sm">
              Moins de poussière, moins de délais, moins de stress
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <FaMedal className="text-accent text-4xl mb-2" />
            <h3 className="font-semibold">Fini haut de gamme</h3>
            <p className="text-gray-400 text-sm">
              Préparation rigoureuse + application contrôlée
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <FaMapLocationDot className="text-accent text-4xl mb-2" />
            <h3 className="font-semibold">Grand rayon</h3>
            <p className="text-gray-400 text-sm">
              Lanaudière + régions adjacentes (2–3h au besoin)
            </p>
          </div>
        </div>

        {/* Video testimonial (real proof) */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-accent mr-1" />
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  Témoignage vidéo — chantier réel
                </span>
              </div>

              <h3 className="text-white text-xl font-bold mb-2">
                Un client, une vraie cuisine, un vrai résultat.
              </h3>

              <p className="text-gray-300">
                Une preuve vaut mille mots. Vidéo tournée chez le client,
                juste après les travaux.
              </p>

              <p className="mt-3 text-gray-400 text-sm">
                ✅ Finition epoxy haut de gamme • ✅ Sans démolition • 🛡️ Garantie
                écrite 25 ans
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${PHONE}`}
                  className="bg-accent text-dark py-3 px-6 rounded-xl font-semibold hover:bg-primary transition-colors text-center"
                >
                  Parler à l’agent
                </a>

                <a
                  href="#contact"
                  className="border border-accent text-accent py-3 px-6 rounded-xl font-semibold hover:bg-accent hover:text-dark transition-colors text-center"
                >
                  Estimation gratuite — 24h
                </a>
              </div>
            </div>

            {/* ✅ Vertical video container (9:16) + capped width */}
            <div className="flex-1">
              <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
                <div className="rounded-2xl overflow-hidden border border-gray-700 bg-black">
                  <div className="relative w-full aspect-[9/16]">
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      poster="/media/testimonial-poster.jpg"
                      className="absolute inset-0 w-full h-full object-contain"
                    >
                      <source
                        src="/media/testimonial-client.mp4"
                        type="video/mp4"
                      />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mt-2 text-center">
                  Témoignage réel filmé chez le client. (Audio/visuel non
                  modifié.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
