interface SectionLabelProps {
  text: string;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ text, className = '', light = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-white/50' : 'bg-dark-gray'}`} />
      <span className={`text-label uppercase ${light ? 'text-white/50' : 'text-dark-gray'}`}>
        {text}
      </span>
    </div>
  );
}
