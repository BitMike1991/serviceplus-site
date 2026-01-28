import { FaKitchenSet, FaHouseChimney, FaPaintRoller } from 'react-icons/fa6';

const services = [
  {
    icon: FaKitchenSet,
    title: 'Armoires de cuisine (époxy — sans démolition)',
    description:
      'Transformez votre cuisine sans tout arracher. Préparation rigoureuse, finition durable et look haut de gamme, à une fraction du coût du remplacement.',
  },
  {
    icon: FaHouseChimney,
    title: 'Peinture extérieure',
    description:
      'Revitalisez l’extérieur de votre propriété avec une finition propre et résistante. Idéal pour augmenter la valeur et améliorer l’apparence dès la première impression.',
  },
  {
    icon: FaPaintRoller,
    title: 'Peinture & surfaces spéciales',
    description:
      'Murs, moulures, poutres, salle de bain, bain, céramique, brique, etc. Quand c’est peinturable, on peut généralement le faire — fini net, sans compromis.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-dark text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nos Services</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-400">
          On se spécialise dans les transformations propres et durables — surtout les armoires de cuisine sans démolition — avec un niveau de finition pensé pour du haut de gamme.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-start"
            >
              <div className="bg-accent text-dark p-4 rounded-full mb-4">
                <Icon className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 flex-grow">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}