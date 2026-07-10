export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  light = false,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {label && (
        <div className={`section-label ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-primary-500" />
          {label}
        </div>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${light ? 'text-ink-300' : 'text-ink-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
