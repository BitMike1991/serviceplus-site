import './globals.css';

export const metadata = {
  title: 'Service Plus | Armoires de cuisine & peinture — fini haut de gamme',
  description: "Rafraîchissement d’armoires de cuisine sans démolition et peinture intérieure/extérieure en Lanaudière et régions adjacentes. Fini premium, durable, économies et garantie jusqu’à 25 ans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}