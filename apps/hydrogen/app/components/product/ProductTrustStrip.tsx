import {Award, Lock, PackageCheck, RefreshCw, Truck} from 'lucide-react';

const defaultNotes = [
  {label: 'Archival paper', icon: Award},
  {label: 'Pigment ink', icon: PackageCheck},
  {label: 'Produced after ordering', icon: Truck},
  {label: 'Secure checkout', icon: Lock},
];

export function ProductTrustStrip({trustNotes}: {trustNotes?: string[]}) {
  const notes = (trustNotes?.length ? trustNotes : defaultNotes.map((note) => note.label))
    .slice(0, 4)
    .map((label, index) => ({
      label,
      icon: defaultNotes[index]?.icon || RefreshCw,
    }));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Buyer confidence notes">
      {notes.map(({label, icon: Icon}) => (
        <div key={label} className="border border-border bg-surface px-4 py-4 text-center">
          <Icon className="mx-auto mb-2 text-text-tertiary" size={18} strokeWidth={1.5} />
          <p className="text-caption uppercase text-text-secondary">{label}</p>
        </div>
      ))}
    </div>
  );
}
