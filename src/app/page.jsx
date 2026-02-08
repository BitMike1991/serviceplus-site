import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Approach from './components/Approach';
import Confidence from './components/Confidence';
import FAQ from './components/FAQ';
import Contact from './components/Contact';

export default function HomePage() {
  const PHONE = process.env.NEXT_PUBLIC_PHONE || '0000000000';

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Comparison />
        <Services />
        <Gallery />
        <Approach />
        <Confidence />
        <FAQ />
        <Contact />
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark/95 border-t border-gray-800 p-3">
        <div className="max-w-7xl mx-auto flex gap-3">
          <a
            href={`tel:${PHONE}`}
            className="flex-1 bg-accent text-dark py-3 px-4 rounded-xl font-extrabold text-center"
          >
            Parler à l’agent
          </a>
          <a
            href="#contact"
            className="flex-1 border border-accent text-accent py-3 px-4 rounded-xl font-semibold text-center"
          >
            Estimation
          </a>
        </div>
      </div>
      <footer className="py-8 bg-dark text-gray-400 text-center text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Service Plus. Tous droits réservés.
      </footer>
    </>
  );
}