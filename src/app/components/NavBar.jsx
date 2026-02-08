"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  const PHONE = process.env.NEXT_PUBLIC_PHONE || '0000000000';

  const prettyPhone = (p) => {
    const digits = String(p).replace(/\D/g, '');
    // Format: (XXX) XXX-XXXX for 10-digit numbers
    if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return p;
  };

  const menuItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Services', href: '#services' },
    { name: 'Réalisations', href: '#realisations' },
    { name: 'Approche', href: '#approche' },
    { name: 'Confiance', href: '#confiance' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark bg-opacity-90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <a href="#accueil" className="flex items-center gap-3">
          <Image
            src="/serviceplus-logo.jpg"
            alt="Service Plus"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <div className="leading-tight">
            <div className="text-xl font-bold tracking-wide">Service <span className="text-accent">Plus</span></div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">Refinition époxy</div>
          </div>
        </a>
        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm uppercase font-medium hover:text-accent">
              {item.name}
            </a>
          ))}
        </nav>
        {/* Call to action */}
        <a
          href={`tel:${PHONE}`}
          className="hidden md:inline-block bg-accent text-dark px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors"
        >
          Parler à l’agent
        </a>
        {/* Mobile menu button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden bg-dark bg-opacity-95 p-6 space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-lg font-semibold uppercase hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href={`tel:${PHONE}`}
            className="block bg-accent text-dark px-4 py-2 rounded-xl text-center font-semibold mt-4"
          >
            Appeler: {prettyPhone(PHONE)}
          </a>
        </nav>
      )}
    </header>
  );
}