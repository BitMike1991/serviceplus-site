import { FaClipboardList, FaSprayCanSparkles, FaCircleCheck } from 'react-icons/fa6';

const steps = [
  {
    icon: FaClipboardList,
    title: 'Diagnostic & options',
    description:
      'On valide les surfaces, l’état actuel et le résultat recherché (couleurs, fini, niveau de durabilité). Estimation claire, sans surprises.',
  },
  {
    icon: FaSprayCanSparkles,
    title: 'Préparation & application',
    description:
      'Préparation sérieuse (dégraissage, ponçage, masquage) puis application contrôlée pour une finition uniforme — le secret d’un fini haut de gamme.',
  },
  {
    icon: FaCircleCheck,
    title: 'Contrôle qualité & garantie',
    description:
      'Inspection finale, conseils d’entretien, et garantie sur les travaux (jusqu’à 25 ans selon le système). On vise du durable, pas du “vite fait”.',
  },
];

export default function Approach() {
  return (
    <section id="approche" className="py-20 bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Notre méthode</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-400">
          Simple, propre, efficace — et pensée pour livrer un résultat premium sans chantier interminable.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-2xl shadow-lg">
              <div className="bg-accent text-dark p-4 rounded-full mb-4">
                <Icon className="text-2xl" />
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