// app/layout.js (or app/layout.tsx)
import './globals.css';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'Service Plus | Refinition époxy armoires de cuisine — Économisez plus de 20 000 $',
  description:
    "Refinition époxy d'armoires de cuisine sans démolition au Québec. Résultat comme neuf, garantie 25 ans, à partir de 3 500 $. Économisez 20 000 $+ vs le remplacement. Lanaudière et régions. Estimation gratuite 24h.",
  keywords: 'refinition armoires cuisine, peinture époxy armoires, armoires de cuisine sans démolition, refinition cuisine Québec, peinture armoires Lanaudière, époxy cuisine, Service Plus',
  openGraph: {
    title: 'Service Plus | Refinition époxy armoires de cuisine',
    description: "Résultat comme neuf, sans démolition, garantie 25 ans. Économisez plus de 20 000 $ vs le remplacement complet.",
    url: 'https://serviceplus.plus',
    siteName: 'Service Plus',
    locale: 'fr_CA',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        {/* Vercel Analytics (tracks page views + events) */}
        <Analytics />
      </body>
    </html>
  );
}
