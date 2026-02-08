import { FaXmark, FaCheck } from 'react-icons/fa6';

const rows = [
  {
    label: 'Prix moyen',
    replace: '25 000 $ – 40 000 $',
    sp: 'À partir de 3 500 $',
  },
  {
    label: 'Durée des travaux',
    replace: '3 à 6 semaines',
    sp: '3 à 5 jours',
  },
  {
    label: 'Démolition requise',
    replace: true,
    sp: false,
  },
  {
    label: 'Poussière / bruit',
    replace: 'Élevé',
    sp: 'Minimal',
  },
  {
    label: 'Cuisine inaccessible',
    replace: '3 – 6 semaines',
    sp: '3 – 5 jours',
  },
  {
    label: 'Garantie',
    replace: '1 an (standard)',
    sp: '25 ans (époxy)',
  },
  {
    label: 'Résultat',
    replace: 'Neuf',
    sp: 'Comme neuf',
  },
];

function CellValue({ value }) {
  if (value === true)
    return (
      <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
        <FaXmark /> Oui
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center gap-1 text-green-400 font-semibold">
        <FaCheck /> Non
      </span>
    );
  return <span>{value}</span>;
}

export default function Comparison() {
  return (
    <section className="py-20 bg-gray-900 text-gray-200">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <p className="text-accent font-extrabold tracking-wide text-center">POURQUOI REFINIR AU LIEU DE REMPLACER ?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-2 mb-4">
          Comparez par vous-même
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-gray-400">
          Un remplacement complet d'armoires de cuisine coûte une fortune. La refinition époxy donne un résultat comparable — pour une fraction du prix.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 pr-4 text-sm text-gray-400 font-medium w-1/3"></th>
                <th className="py-4 px-4 text-center">
                  <span className="text-red-400 font-bold text-sm uppercase tracking-wide">Remplacement complet</span>
                </th>
                <th className="py-4 pl-4 text-center">
                  <div className="inline-block bg-accent/10 border border-accent/30 rounded-xl px-4 py-1">
                    <span className="text-accent font-bold text-sm uppercase tracking-wide">Service Plus</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, replace, sp }) => (
                <tr key={label} className="border-b border-gray-800">
                  <td className="py-4 pr-4 font-medium text-gray-300 text-sm">{label}</td>
                  <td className="py-4 px-4 text-center text-sm text-gray-400">
                    <CellValue value={replace} />
                  </td>
                  <td className="py-4 pl-4 text-center text-sm text-white font-semibold">
                    <CellValue value={sp} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-2xl md:text-3xl font-extrabold text-accent mb-2">
            Économisez plus de 20 000 $
          </p>
          <p className="text-gray-400">
            Même résultat, fraction du prix, garantie 5x plus longue.
          </p>
        </div>
      </div>
    </section>
  );
}
